import { ArgentProps } from "./argent";
import { EUserStatus, EUserRole } from "@/enums/user";

export interface UserProfileProps {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: EUserRole;
  status: EUserStatus;
}

export interface UserDetailProps {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: EUserRole;
  status: EUserStatus;
  argent: ArgentProps | null;
}
