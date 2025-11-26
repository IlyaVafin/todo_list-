import { CreateUserDTO } from "./dto/create.user.dto";
import { UserRepository } from "./repository/user.repository";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    create(dto: CreateUserDTO): Promise<{
        success: string;
    }>;
}
