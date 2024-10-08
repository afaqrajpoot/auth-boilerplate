import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ACGuard, UseRoles } from "nest-access-control";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProfileService, IGenericMessageBody } from "./profile.service";
import { PatchProfilePayload } from "./payload/patch.profile.payload";
import { IProfile } from "./profile.model";

/**
 * Profile Controller
 */
@ApiBearerAuth()
@ApiTags("profile")
@Controller("api/profile")
export class ProfileController {
  /**
   * Constructor
   * @param profileService
   */
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Retrieves a particular profile
   * @param id the profile given id to fetch
   * @returns {Promise<IProfile>} queried profile data
   */
  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiResponse({ status: 200, description: "Fetch Profile Request Received" })
  @ApiResponse({ status: 400, description: "Fetch Profile Request Failed" })
  async getProfile(@Param("id") id: string): Promise<IProfile> {
    const profile = await this.profileService.getById(id);
    if (!profile) {
      throw new BadRequestException(
        "The profile with that id could not be found.",
      );
    }
    return profile;
  }

  /**
   * Edit a profile
   * @param id the profile given id to fetch and update
   * @param {RegisterPayload} payload
   * @returns {Promise<IProfile>} mutated profile data
   */
  @Patch(":id")
  @UseGuards(AuthGuard("jwt"))
  @UseRoles({
    resource: "profiles",
    action: "update",
    possession: "own",
  })
  @ApiResponse({ status: 200, description: "Patch Profile Request Received" })
  @ApiResponse({ status: 400, description: "Patch Profile Request Failed" })
  async patchProfile(
    @Body() payload: PatchProfilePayload,
    @Param("id") id: string,
  ) {
    return await this.profileService.edit(id, payload);
  }

  /**
   * Removes a profile from the database
   * @param {string} id the id of record to remove
   * @returns {Promise<IGenericMessageBody>} whether or not the profile has been deleted
   */
  @Delete(":id")
  @UseGuards(AuthGuard("jwt"), ACGuard)
  @UseRoles({
    resource: "profiles",
    action: "delete",
    possession: "own",
  })
  @ApiResponse({ status: 200, description: "Delete Profile Request Received" })
  @ApiResponse({ status: 400, description: "Delete Profile Request Failed" })
  async delete(@Param("id") id: string): Promise<IGenericMessageBody> {
    return await this.profileService.delete(id);
  }
}
