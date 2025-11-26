import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create.user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(body: CreateUserDTO): Promise<{
        success: string;
    }>;
}
