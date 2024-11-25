export type UserType = {
  username: string;
  name: string;
};

export type UserDetailType = {
  user: UserType;
} & UserDetailDataType;

export type UserAddressType = {
  streetAddress: string;
  city: string;
  zip: string;
  country: string;
};

export type UserDetailDataType = {
  birthDay: string;
  address: UserAddressType;
  billingAddress: UserAddressType;
  processData: boolean;
  isMale: boolean | string;
  referral: string | null;
  favouriteGerners: string[];
};
