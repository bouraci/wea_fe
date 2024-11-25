"use client";

import { UserDetailDataType } from "@/app/types/UserType";
import { getUserDetails } from "@api/apiUser";
import { Spinner } from "@components/spinner";
import { UserDetailsForm } from "@components/user/user-detail";
import { useUser } from "@contexts/UserContext";
import { useFetch } from "@hooks/useFetch";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

export default function User() {
  const { user } = useUser();
  const t = useTranslations("common");
  const { data, isLoading } = useFetch<UserDetailDataType>(
    "userDetail",
    getUserDetails,
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (data && user) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Link href="/" className="button button--good">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
            {t("backToList")}
          </Link>
        </div>
        <UserDetailsForm userData={{ user, ...data }} />
      </div>
    );
  }

  return null;
}
