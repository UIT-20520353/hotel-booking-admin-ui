export const UserStatusMapper: { [key: string]: string } = {
  CREATED: "Created",
  BLOCKED: "Blocked",
  REJECTED: "Rejected",
  ACTIVE: "Active",
};

export const UserRoleMapper: { [key: string]: string } = {
  USER: "User",
  ADMIN: "Admin",
  AGENT: "Argent",
};

export const UserStatusColorMapper: { [key: string]: string } = {
  CREATED: "default",
  BLOCKED: "error",
  REJECTED: "error",
  ACTIVE: "success",
};
