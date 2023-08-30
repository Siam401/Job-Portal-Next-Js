'use client';

import { useAppDispatch } from '@/redux/hook';
import { toastActions } from '@/redux/features/toast.slice';
import { Button } from 'primereact/button';
import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcher from '@/components/LocaleSwitcher';

export default function Home() {
  const trans = useTranslations('home');
  // const locale = useLocale();
  const dispatch = useAppDispatch();
  const handleToast = () => {
    dispatch(
      toastActions.showToast({
        type: 'info',
        summary: 'Message',
        message: 'This is a Toast Message',
      }),
    );
  };

  return (
    <section className="page-content">
      <h2 className="mt-10 text-center font-bold text-3xl">
        {trans('welcome')}
      </h2>

      <div className="p-5 text-center flex space-x-6 items-center justify-center">
        <Button
          severity="help"
          type="button"
          label="Show Toast"
          onClick={handleToast}
        />
        <LocaleSwitcher />
      </div>
    </section>
  );
}
