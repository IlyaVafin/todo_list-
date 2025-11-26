import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDTO {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    body: string;
    @IsBoolean()
    done: boolean;
}
