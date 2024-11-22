"use client";

import { UserDetailDataType, UserDetailType } from "@/app/types/UserType";
import { updateUserDetails } from "@api/apiUser";
import { Button } from "@components/button";
import { Card } from "@components/card";
import { FormInput } from "@components/input";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { mutate } from "swr";

export function UserDetailsForm({
  userData,
  swrKey,
}: {
  userData: UserDetailType;
  swrKey?: string;
}) {
  const {
    register,
    handleSubmit,
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
    },
  });

  const onSubmit: SubmitHandler<UserDetailDataType> = async (data) => {
    try {
      await updateUserDetails({
        birthDay: data.birthDay,
        address: data.address,
        billingAddress: data.billingAddress,
        favouriteGerners: userData.favouriteGerners,
        processData: data.processData,
        isMale: data.isMale === "true",
        referral: data.referral,
      });
      toast.success("Update Success");
      mutate((swrKey ??= "userDetail"));
    } catch {
      toast.error("Update Failed");
    }
  };
  const today = new Date().toISOString().split("T")[0];

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Card className="flex flex-col gap-2" heading="Detaily Uživatele">
        <FormInput
          type="text"
          label="Name"
          error={errors.user?.name?.message}
          disabled
          {...register("user.name", { required: "nameRequired" })}
        />
        <FormInput
          type="text"
          label="Street"
          error={errors.address?.streetAddress?.message}
          {...register("address.streetAddress", { required: "streetRequired" })}
        />

        <div className="grid grid-cols-2 gap-2">
          <FormInput
            type="text"
            label="City"
            error={errors.address?.city?.message}
            {...register("address.city", { required: "cityRequired" })}
          />
          <FormInput
            type="text"
            label="ZIP"
            error={errors.address?.zip?.message}
            {...register("address.zip", { required: "zipRequired" })}
          />
        </div>

        <FormInput
          type="text"
          label="Country"
          error={errors.address?.country?.message}
          {...register("address.country", { required: "countryRequired" })}
        />

        <div className="grid grid-cols-2 gap-2">
          <FormInput type="text" label="Referral" {...register("referral")} />

          <FormInput
            type="date"
            {...register("birthDay", {
              required: "Datum narozeni is required.",
              validate: (value) =>
                new Date(value) < new Date(today) || "Select a past date.",
            })}
            max={today}
            label="Birth Day"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("processData", {
              required: "You need to aggree to data processing",
            })}
            id="processData"
            className="w-4 h-4"
          />
          {errors.processData && (
            <small className="text-red-500">
              {errors.processData?.message}
            </small>
          )}
          <label htmlFor="processData">Process data</label>
        </div>
        <div className="flex items-center gap-2">
          <label>Gender</label>
          <select {...register("isMale")} className="border rounded-md p-2">
            <option value="true">{"male"}</option>
            <option value="false">{"female"}</option>
          </select>
        </div>
      </Card>

      <Card className="flex flex-col gap-2" heading="Fakturační adresa">
        <FormInput
          type="text"
          label="Street"
          error={errors.billingAddress?.streetAddress?.message}
          {...register("billingAddress.streetAddress", {
            required: "billingStreetRequired",
          })}
        />

        <div className="grid grid-cols-2 gap-2">
          <FormInput
            type="text"
            label="City"
            error={errors.billingAddress?.city?.message}
            {...register("billingAddress.city", {
              required: "billingCityRequired",
            })}
          />
          <FormInput
            type="text"
            label="ZIP"
            error={errors.billingAddress?.zip?.message}
            {...register("billingAddress.zip", {
              required: "billingZipRequired",
            })}
          />
        </div>

        <FormInput
          type="text"
          label="Country"
          error={errors.billingAddress?.country?.message}
          {...register("billingAddress.country", {
            required: "billingCountryRequired",
          })}
        />
      </Card>
      <Button type="submit" label="Save" className="w-max" />
    </form>
  );
}
