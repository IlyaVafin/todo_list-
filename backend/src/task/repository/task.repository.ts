import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDTO } from "../dto/create.task.dto";

@Injectable()
export class TaskRepository {
    constructor(private readonly prismaService: PrismaService) {}
    async getAll(userId: string) {
        return await this.prismaService.task.findMany({
            where: {
                userId,
            },
            select: {
                id: true,
                title: true,
                body: true,
                done: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
    }
    async create(userId: string, dto: CreateTaskDTO) {
        const { body, done, title } = dto;

        return await this.prismaService.task.create({
            data: {
                userId,
                body,
                done,
                title,
            },
        });
    }
    async update(taskId: string, dto: Partial<CreateTaskDTO>) {
        const { body, done, title } = dto;
        return await this.prismaService.task.update({
            where: {
                id: taskId,
            },
            data: {
                body,
                done,
                title,
            },
        });
    }
    async delete(taskId: string) {
        return await this.prismaService.task.delete({
            where: {
                id: taskId,
            },
        });
    }
}
