import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  IsOptional,
} from "class-validator";

/**
 * Patch Profile Payload Class
 */
export class PatchProfilePayload {
  /**
   * Email field
   */
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email: string;

  /**
   * Name field
   */
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @Matches(/^[a-zA-Z ]+$/)
  name: string;

  /**
   * Password field
   */
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @MinLength(8, { message: "Password must be at least 8 characters long." })
  @Matches(/[a-zA-Z]/, {
    message: "Password must contain at least one letter.",
  })
  @Matches(/\d/, {
    message: "Password must contain at least one number.",
  })
  @Matches(/[\W_]/, {
    message: "Password must contain at least one special character.",
  })
  password: string;
}
