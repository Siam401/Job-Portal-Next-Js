'use client';

import {
  AuthApi,
  checkAuthentication,
  clearSession,
} from '@/app/api/auth/auth';
import { toastActions } from '@/redux/features/toast.slice';
import { useAppDispatch } from '@/redux/hook';
import type { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import Loading from '../../loading';

const SignOut: NextPage = () => {
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    setTimeout(() => {
      signOut({ callbackUrl: '/signin' });
    }, 1000);

    dispatch(
      toastActions.showToast({
        type: 'success',
        summary: 'Success',
        message: 'User successfully logged out',
      }),
    );
  };

  useEffect(() => {
    async function handleLogout() {
      // Delete server authentication token
      const response = await AuthApi.logout();

      if (
        response.success ||
        !checkAuthentication() ||
        response.resultCode === 401
      ) {
        // Delete client authentication token
        clearSession();

        // Handle logout from next-auth
        handleSignOut();
      } else {
        // Show logout failure message
        dispatch(
          toastActions.showToast({
            type: 'error',
            summary: 'Error',
            message: 'User logout operation failed',
          }),
        );
      }
    }

    handleLogout();
  }, []);

  return <Loading />;
};

export default SignOut;
