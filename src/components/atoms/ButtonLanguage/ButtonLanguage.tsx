import React, { memo } from 'react';

import { useRouter } from 'next/dist/client/router';

export const B4HButtonLanguage: React.FC = memo(() => {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (e: any) => {
    const locale = e.target.value;
    router.push('/', '/', { locale });
  };

  return (
    <div className="flex flex-row items-center justify-between p-2 pr-8">
      <select
        defaultValue={locale}
        onChange={changeLanguage}
        className="inline-flex shadow-sm rounded-md"
      >
        <option
          value="en"
          className="bg-white dark:bg-gray-800 text-xs font-medium px-2 py-1 text-gray-900 dark:text-gray-200"
        >
          EN
        </option>
        <option
          value="es"
          className="bg-white dark:bg-gray-800 text-xs font-medium px-2 py-1 text-gray-900 dark:text-gray-200"
        >
          ES
        </option>
        <option
          value="pt"
          className="bg-white dark:bg-gray-800 text-xs font-medium px-2 py-1 text-gray-900 dark:text-gray-200"
        >
          PT
        </option>
      </select>
    </div>
  );
});
