export const UserRolesEnum = {
  ADMIN: "admin",
  USER: "user",
  GUEST: "guest",
} as const;


export const UserAuthType = {
  GOOGLE: "google",
  GITHUB: "github",
  CREDENTIALS: "credentials",
} as const;

export const AvailableUserRoles = Object.values(UserRolesEnum);
export const AvailableAuthTypes = Object.values(UserAuthType);
