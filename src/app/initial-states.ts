import { EUserRole, EUserStatus } from "@/enums/user";
import { HotelServiceProps } from "@/models/amenity";
import { PaginationProps } from "@/models/pagination";
import { UserDetailProps, UserProfileProps } from "@/models/user";

export const initialUserProfile: UserProfileProps = {
  id: -1,
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  role: EUserRole.USER,
  status: EUserStatus.ACTIVE,
};

export const initialUserDetail: UserDetailProps = {
  id: -1,
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  role: EUserRole.USER,
  status: EUserStatus.ACTIVE,
  argent: {
    id: -1,
    identityNumber: "",
    frontIdentityCard: "",
    backIdentityCard: "",
    selfieImg: "",
  },
};

export const initialPagination: PaginationProps = {
  size: 10,
  page: 1,
  sort: "id,asc",
};

export const initialHotelService: HotelServiceProps = {
  id: -1,
  name: "",
};
