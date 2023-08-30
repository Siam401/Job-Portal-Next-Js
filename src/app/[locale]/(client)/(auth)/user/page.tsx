'use client';

import { saveUserToken } from '@/app/api/auth/auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '../../loading';

export default function User() {
  const router = useRouter();
  const session: any = useSession();

  useEffect(() => {
    if (session.status == 'authenticated' && session.data?.user_type) {
      saveUserToken(session.data?.token);
      router.push('/' + session.data.user_type);
    } else {
      router.push('/signin');
    }
  }, [session]);

  return <Loading />;
}
