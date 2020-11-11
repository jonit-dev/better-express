import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserCreateDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  email: string;
}
