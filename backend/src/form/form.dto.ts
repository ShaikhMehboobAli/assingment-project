import { IsString, IsEmail, IsDateString } from 'class-validator';

/*
    type creation for extra check for the field
*/
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

}
