import Link from 'next/link';
import React from 'react';
import FormComponent from '@/app/[locale]/(client)/(auth)/signup/components/sections/FormComponent';
import SocialLoginComponent from '@/app/[locale]/(client)/(auth)/components/SocialLoginComponent';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session != null) {
    return redirect('/');
  }

  return (
    <section className="bg-gradient-to-br from-[#3AB54B]/[0.15] via-[#ED6922]/[0.15] to-[#3399FF]/[0.15]">
      <div className="flex flex-col items-center justify-center px-3 py-[120px] mx-auto lg:py-[120px]">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Registration of your account
            </h1>

            <FormComponent />

            <SocialLoginComponent />

            <p className="text-md text-gray-500">
              Already have an account?{' '}
              <Link
                href={'/signin'}
                className="font-medium text-[#39B54A] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
