import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
  DEFAULT = "DEFAULT",
}

/**
 * Roles Builder
 */
export const roles: RolesBuilder = new RolesBuilder();

// Configure the default role to access only its own data
roles
  .grant(AppRoles.DEFAULT)
  .readOwn("profile")
  .updateOwn("profile")
  .deleteOwn("profile");
