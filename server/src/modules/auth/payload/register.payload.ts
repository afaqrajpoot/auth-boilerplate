import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, Matches } from "class-validator";

/**
 * Register Payload Class
 */
export class RegisterPayload {
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
   * Name field
   */
  @ApiProperty({
    required: true,
  })
  @Matches(/^[a-zA-Z ]+$/)
  @IsNotEmpty()
  name: string;

  /**
   * Password field
   */
  @ApiProperty({
    required: true,
  })
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
