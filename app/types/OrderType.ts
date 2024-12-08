import { BookListItemType } from "@/app/types/BookListType";
import { UserAddressType } from "@/app/types/UserType";

export type OrderType = {
  id: number;
  books: BookListItemType[];
  created: string;
  totalPrice: number;
  paymentMethod: number;
  status?: number;
  userSnapshot?: AddressSnapshotType;
};

export type OrderResponseType = Omit<OrderType, "userSnapshot"> & {
  userSnapshot?: string;
};

export type OrderAddressType = {
  StreetAddress: string;
  City: string;
  Zip: string;
  Country: string;
};

export type AddressSnapshotType = {
  address: OrderAddressType;
  billingAddress: OrderAddressType;
};

export function mapOrder(jsonOrder: OrderResponseType): OrderType {
  const { userSnapshot, ...rest } = jsonOrder;

  let parsedUserSnapshot: AddressSnapshotType | undefined;

  if (userSnapshot) {
    const snapshotData = JSON.parse(userSnapshot) as {
      Address: OrderAddressType;
      BillingAddress: OrderAddressType;
    };
    parsedUserSnapshot = {
      address: snapshotData.Address,
      billingAddress: snapshotData.BillingAddress,
    };
  }

  return {
    ...rest,
    userSnapshot: parsedUserSnapshot,
  };
}
