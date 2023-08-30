import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const locales = ['en', 'bn'];

const adminPages = [
  '/admin',
  '/admin/(.*)',
  // Add more admin-only pages
];

const applicantPages = [
  '/applicant',
  '/applicant/(.*)',
  // Add more applicant-only pages
];

const secretPages = ['secret'];

// section: intl middleware for localization
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
});

// section: auth middleware for role based authorization
const authMiddleware = withAuth((req) => intlMiddleware(req), {
  callbacks: {
    authorized: async ({ token, req }: any) => {
      // Perform your role-based authorization logic here
      // console.log(token)
      const userType = token?.user_type ?? false;

      // Check the user's role and return true only if the role is authorized for the current page
      if (!token) {
        return false;
      } else if (secretPages.includes(req.nextUrl.pathname)) {
        return true;
      } else {
        const isAuthorized =
          token.user &&
          ((isAdminPage(req.nextUrl.pathname) && userType === 'admin') ||
            (isApplicantPage(req.nextUrl.pathname) &&
              userType === 'applicant'));
        return isAuthorized;
      }
    },
  },
  pages: {
    signIn: '/signin',
  },
});

// section: default middleware for all pages
export default function middleware(req: NextRequest) {
  const isSecret = isSecretPage(req.nextUrl.pathname);

  // console.log('isSecret', isSecret)
  // console.log('isAdmin', isAdminPage(req.nextUrl.pathname))
  // console.log('isApplicant', isApplicantPage(req.nextUrl.pathname))
  if (
    isSecret ||
    isAdminPage(req.nextUrl.pathname) ||
    isApplicantPage(req.nextUrl.pathname)
  ) {
    return (authMiddleware as any)(req);
  }

  return intlMiddleware(req);
}

// section: Skip all paths that should not be internationalized
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

/**
 *  functions to check if the current page is admin-only,
 *  applicant-only, or secret (accessible by both admin and applicant)
 */

function isAdminPage(pathname: string) {
  const adminPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${adminPages
      .map((page) => page.replace(/:[^/]+/g, '[^/]+'))
      .join('|')})(\\?.*)?$`,
    'i',
  );
  return adminPathnameRegex.test(pathname);
}

function isApplicantPage(pathname: string) {
  const applicantPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${applicantPages
      .map((page) => page.replace(/:[^/]+/g, '[^/]+'))
      .join('|')})(\\?.*)?$`,
    'i',
  );
  return applicantPathnameRegex.test(pathname);
}

function isSecretPage(pathname: string) {
  const secretPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${secretPages
      .map((page) => page.replace(/:[^/]+/g, '[^/]+'))
      .join('|')})(\\?.*)?$`,
    'i',
  );
  return secretPathnameRegex.test(pathname);
}

// export { default } from 'next-auth/middleware';

// export const config = { matcher: ['/dashboard'] };
