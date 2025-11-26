import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name: string;
    @IsEmail()
    email: string;
    @MinLength(8)
    password: string;
}
