"use client";

import {useRouter} from 'next/navigation';
import {ChangeEvent, useState} from 'react';
import Cookies from 'js-cookie';
import {useTranslations} from "next-intl";
import {DEFAULT_LOCALE, LOCALES} from "@/app/constants";

export function LocaleSwitcher() {
    const t = useTranslations('common');
    const router = useRouter();
    const [locale, setLocale] = useState(Cookies.get('locale') || DEFAULT_LOCALE);

    const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedLocale = event.target.value;
        Cookies.set('locale', selectedLocale);
        setLocale(selectedLocale);
        router.refresh();
    };

    return (
        <div>
            <label htmlFor="locale-select" className="mr-2">{t('language')}:</label>
            <select
                id="locale-select"
                value={locale}
                onChange={handleLocaleChange}
                className="p-2 border rounded"
            >
                {LOCALES.map((lang) => (
                    <option key={lang} value={lang}>
                        {lang.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
}
