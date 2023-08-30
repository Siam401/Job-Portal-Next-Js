'use client';

import { signIn } from 'next-auth/react';
import { Button } from 'primereact/button';

export default function SocialLoginComponent() {
  const signInSocial = async (provider: string) => {
    const data: any = await signIn(provider, {
      callbackUrl: '/user',
    });
  };
  return (
    <>
      <p className="text-md text-gray-500 text-center">Or, Sign In with</p>
      <ul className="text-center">
        <li className="inline-block list-none mx-2">
          <Button
            className="mb-3 px-3 w-[60px] h-[46px] block text-lg font-medium text-white  rounded text-center shadow-[0_4px_9px_-4px_#3b71ca] hover:shadow-none ease-in-out duration-300"
            style={{ backgroundColor: '#3b5998' }}
            role="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={() => {
              signInSocial('facebook');
            }}
          >
            <i className="fab fa-facebook-f"></i>
          </Button>
        </li>
        <li className="inline-block list-none mx-2">
          <Button
            severity="danger"
            className="mb-3 px-3 w-[60px] h-[46px] block text-lg font-medium text-white  rounded text-center shadow-[0_4px_9px_-4px_#d24823] hover:shadow-none ease-in-out duration-300"
            style={{ backgroundColor: '#E74A1F' }}
            // href="#!"
            role="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={() => {
              signInSocial('google');
            }}
          >
            <i className="fab fa-google"></i>
          </Button>
        </li>
        <li className="inline-block list-none mx-2">
          <Button
            severity="info"
            className="mb-3 px-3 w-[60px] h-[46px] block text-lg font-medium text-white  rounded text-center shadow-[0_4px_9px_-4px_#55acee] hover:shadow-none ease-in-out duration-300"
            style={{ backgroundColor: '#55acee' }}
            role="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={() => {
              signInSocial('linkedin');
            }}
          >
            <i className="fab fa-linkedin"></i>
          </Button>
        </li>
      </ul>
    </>
  );
}
