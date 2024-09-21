import { ApiProperty } from "@nestjs/swagger";
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  Matches,
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
  @IsNotEmpty({ message: "Password should not be empty." })
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
