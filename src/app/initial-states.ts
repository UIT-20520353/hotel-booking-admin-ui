import { EUserRole, EUserStatus } from "@/enums/user";
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
