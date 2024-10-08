import { Controller, Body, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService, ITokenReturnBody } from "./auth.service";
import { LoginPayload } from "./payload/login.payload";
import { RegisterPayload } from "./payload/register.payload";
import { ProfileService } from "../profile/profile.service";
import { IProfile } from "modules/profile/profile.model";
import { Model } from "mongoose";

export interface IAuthResponse extends IProfile, ITokenReturnBody {}
/**
 * Authentication Controller
 */
@Controller("api/auth")
@ApiTags("authentication")
export class AuthController {
  /**
   * Constructor
   * @param {AuthService} authService authentication service
   * @param {ProfileService} profileService profile service
   */
  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
  ) {}

  /**
   * Login route to validate and create tokens for users
   * @param {LoginPayload} payload the login dto
   */
  @Post("login")
  @ApiResponse({ status: 201, description: "Login Completed" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async login(@Body() payload: LoginPayload): Promise<IAuthResponse> {
    const user = await this.authService.validateUser(payload);
    const token = await this.authService.createToken(user);
    const formattedUser = user.toJSON();

    return {
      ...formattedUser,
      ...token,
    } as IAuthResponse;
  }

  /**
   * Registration route to create and generate tokens for users
   * @param {RegisterPayload} payload the registration dto
   */
  @Post("register")
  @ApiResponse({ status: 201, description: "Registration Completed" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async register(@Body() payload: RegisterPayload): Promise<IAuthResponse> {
    const user = await this.profileService.create(payload);
    const token = await this.authService.createToken(user);
    const formattedUser = user.toJSON();
    return {
      ...formattedUser,
      ...token,
    } as IAuthResponse;
  }
}
