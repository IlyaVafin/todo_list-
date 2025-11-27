import { User } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "../dto/create.user.dto";
export declare class UserRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(dto: CreateUserDTO): Promise<void>;
}
