import {getRequestConfig} from 'next-intl/server';
import {cookies} from "next/headers";
import {DEFAULT_LOCALE,LOCALES} from "@/app/constants";

export default getRequestConfig(async () => {
    const localeSetting = cookies().get('locale')?.value;
    const locale = LOCALES.includes(localeSetting ?? '') ? localeSetting : DEFAULT_LOCALE;

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
