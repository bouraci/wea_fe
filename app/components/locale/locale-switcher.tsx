"use client";

import { LabeledSelect } from "@components/input";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { DEFAULT_LOCALE, LOCALES } from "@/app/constants";

export function LocaleSwitcher() {
  const t = useTranslations("common");
  const router = useRouter();
  const [locale, setLocale] = useState(DEFAULT_LOCALE);

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = event.target.value;
    Cookies.set("locale", selectedLocale);
    setLocale(selectedLocale);
    router.refresh();
  };

  useEffect(() => {
    setLocale(Cookies.get("locale") || DEFAULT_LOCALE);
  }, []);

  return (
    <LabeledSelect
      className="w-max"
      label={t("language")}
      id="locale"
      value={locale}
      onChange={handleLocaleChange}
      labelInline={true}
    >
      {LOCALES.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </LabeledSelect>
  );
}
