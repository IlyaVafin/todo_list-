import { Injectable } from "@nestjs/common";
import { User } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "../dto/create.user.dto";

@Injectable()
export class UserRepository {
    constructor(private readonly prismaService: PrismaService) {}
    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });
        return user;
    }
    async findById(id: string): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
        });
        return user;
    }
    async create(dto: CreateUserDTO) {
        const { email, name, password } = dto;

        await this.prismaService.user.create({
            data: {
                email,
                name,
                password,
            },
        });
    }
}
