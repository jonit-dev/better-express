import { IsDefined, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthSignUpDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  password: string;
}

export class AuthLoginDTO {
  @IsDefined()
  email: string;

  @IsDefined()
  password: string;
}
