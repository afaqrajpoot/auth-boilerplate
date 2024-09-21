import { ApiProperty } from "@nestjs/swagger";
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from "class-validator";

/**
 * Login Paylaod Class
 */
export class LoginPayload {
  /**
   * Email field
   */
  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Password field
   */
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
