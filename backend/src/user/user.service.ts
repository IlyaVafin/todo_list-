import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create.user.dto";
import { UserRepository } from "./repository/user.repository";
import { hash } from "bcrypt";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}
    async create(dto: CreateUserDTO) {
        const { email, name, password } = dto;
        const user = await this.userRepository.findByEmail(dto.email);
        if (user) {
            throw new ConflictException("User with this email already exists");
        }
        const hashedPassword = await hash(password, 10);
        await this.userRepository.create({
            email,
            name,
            password: hashedPassword,
        });
        return { success: "true" };
    }
}
