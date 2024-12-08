"use client";

import { UserDetailDataType, UserDetailType } from "@/app/types/UserType";
import { updateUserDetails } from "@api/apiUser";
import { Button } from "@components/button";
import { Card } from "@components/card";
import { FormInput } from "@components/input";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslations } from "next-intl";

export const UserDetailsForm = forwardRef(function UserDetailsForm(
  {
    userData,
    checkout = false,
  }: {
    userData: UserDetailType;
    checkout?: boolean;
  },
  ref,
) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<UserDetailType>({
    defaultValues: {
      user: userData.user,
      birthDay: userData.birthDay?.split("T").at(0),
      address: userData.address,
      billingAddress: userData.billingAddress,
      processData: userData.processData,
      isMale: userData.isMale ?? true,
      referral: userData.referral,
      email: userData.email,
    },
  });

  const t = useTranslations("user");

  const [sameAddress, setSameAddress] = useState(
    JSON.stringify(userData.address) ===
      JSON.stringify(userData.billingAddress),
  );

  const onSubmit: SubmitHandler<UserDetailDataType> = async (data) => {
    if (sameAddress) {
      setValue("billingAddress", data.address);
    }

    try {
      await updateUserDetails({
        birthDay: data.birthDay,
        address: data.address,
        billingAddress: sameAddress ? data.address : data.billingAddress,
        favouriteGerners: userData.favouriteGerners,
        processData: data.processData,
        isMale: data.isMale === "true",
        referral: data.referral,
        email: data.email,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      !checkout && toast.success(t("userDetailsUpdateSuccess"));
    } catch {
      toast.error(t("userDetailsUpdateFailed"));
    }
  };
  const today = new Date().toISOString().split("T")[0];

  useImperativeHandle(ref, () => ({
    validateAndSubmit: () => trigger().then((isValid) => isValid),
    handleSubmit: handleSubmit(onSubmit),
  }));

  return (
    <form
      id="shipping-details-form"
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="flex flex-col gap-2" heading={t("userDetails")}>
        <div className="grid grid-cols-2 gap-2">
          <FormInput
            type="text"
            label={t("name")}
            error={errors.user?.name?.message}
            disabled
            {...register("user.name", { required: t("nameRequired") })}
          />
          <FormInput
            type="email"
            label={t("email")}
            error={errors.email?.message}
            {...register("email", {
              required: checkout ? t("emailRequired") : false,
            })}
          />
        </div>
        <FormInput
          type="text"
          label={t("street")}
          error={errors.address?.streetAddress?.message}
          {...register("address.streetAddress", {
            required: checkout ? t("streetRequired") : false,
          })}
        />

        <div className="grid grid-cols-2 gap-2">
          <FormInput
            type="text"
            label={t("city")}
            error={errors.address?.city?.message}
            {...register("address.city", {
              required: checkout ? t("cityRequired") : false,
            })}
          />
          <FormInput
            type="number"
            label={t("zip")}
            error={errors.address?.zip?.message}
            {...register("address.zip", {
              required: checkout ? t("zipRequired") : false,
            })}
          />
        </div>

        <FormInput
          type="text"
          label={t("country")}
          error={errors.address?.country?.message}
          {...register("address.country", {
            required: checkout ? t("countryRequired") : false,
          })}
        />

        <div className="grid grid-cols-2 gap-2">
          <FormInput type="text" label="Referral" {...register("referral")} />

          <FormInput
            type="date"
            {...register("birthDay", {
              validate: (value) =>
                new Date(value) < new Date(today) || "Select a past date.",
            })}
            max={today}
            label={t("birthDay")}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("processData", {
              required: t("processDataRequired"),
            })}
            id="processData"
            className="w-4 h-4"
          />
          {errors.processData && (
            <small className="text-red-500">
              {errors.processData?.message}
            </small>
          )}
          <label htmlFor="processData">{t("processData")}</label>
        </div>
        <div className="flex items-center gap-2">
          <label>{t("gender")}</label>
          <select {...register("isMale")} className="border rounded-md p-2">
            <option value="true">{t("male")}</option>
            <option value="false">{t("female")}</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={sameAddress}
            onChange={(e) => {
              setSameAddress(e.target.checked);
              if (e.target.checked) {
                setValue("billingAddress", getValues("address"));
              }
            }}
            id="sameAddress"
            className="w-4 h-4"
          />
          <label htmlFor="sameAddress">{t("BillingAddressSame")}</label>
        </div>
      </Card>

      {!sameAddress && (
        <Card className="flex flex-col gap-2" heading={t("billingAddress")}>
          <FormInput
            type="text"
            label={t("street")}
            error={errors.billingAddress?.streetAddress?.message}
            {...register("billingAddress.streetAddress", {
              required: checkout ? t("streetRequired") : false,
            })}
          />

          <div className="grid grid-cols-2 gap-2">
            <FormInput
              type="text"
              label={t("city")}
              error={errors.billingAddress?.city?.message}
              {...register("billingAddress.city", {
                required: checkout ? t("cityRequired") : false,
              })}
            />
            <FormInput
              type="number"
              label={t("zip")}
              error={errors.billingAddress?.zip?.message}
              {...register("billingAddress.zip", {
                required: checkout ? t("zipRequired") : false,
              })}
            />
          </div>

          <FormInput
            type="text"
            label={t("country")}
            error={errors.billingAddress?.country?.message}
            {...register("billingAddress.country", {
              required: checkout ? t("countryRequired") : false,
            })}
          />
        </Card>
      )}
      {!checkout && (
        <Button type="submit" label={t("save")} className="w-max" />
      )}
    </form>
  );
});
