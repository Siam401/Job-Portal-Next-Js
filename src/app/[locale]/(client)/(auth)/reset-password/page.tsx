import Link from 'next/link';
import React from 'react';
import FormComponent from './components/FormComponent';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export default async function PasswordResetPage() {
  const session = await getServerSession(authOptions);

  if (session != null) {
    return redirect('/');
  }

  return (
    <section className="bg-gradient-to-br from-[#3AB54B]/[0.15] via-[#ED6922]/[0.15] to-[#3399FF]/[0.15]">
      <div className="flex flex-col items-center justify-center px-6 py-[150px] mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Reset your password
            </h1>
            <p className="text-md text-gray-500">
              Password must be include at least one number and Uppercase letter.
            </p>
            <FormComponent />
            <div className="flex justify-center">
              <Link
                href="/signin"
                className="text-sm font-medium hover:underline text-[#39B54A] hover:text-[#2ea23e]"
              >
                <i className="fa fa-arrow-left"></i> Go back to Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
