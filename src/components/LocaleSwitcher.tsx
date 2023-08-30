import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function LocaleSwitcher() {
  const trans = useTranslations('switchLocale');
  const locale = useLocale();
  const otherLocale = locale === 'en' ? 'bn' : 'en';

  return (
    <Link
      href={'/' + otherLocale}
      prefetch={false}
      className="border border-gray-300 rounded-md p-2 text-white bg-slate-500 min-w-64 text-sm"
    >
      {trans('title', { locale: otherLocale })}
    </Link>
  );
}
