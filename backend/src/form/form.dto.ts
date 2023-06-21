import { IsString, IsEmail, IsDateString } from 'class-validator';

export class CreateFormDto {
  @IsString()
  username: string;

  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsDateString()
  dateOfBirth: string;
}

export class UpdateFormDto {
  @IsString()
  username: string;

//   Add additional validation rules for the fields that can be updated
}
