import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDTO } from "../dto/create.task.dto";
export declare class TaskRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAll(userId: string): Promise<{
        id: string;
        title: string;
        body: string;
        done: boolean;
    }[]>;
    create(userId: string, dto: CreateTaskDTO): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        body: string;
        done: boolean;
        userId: string;
    }>;
    update(taskId: string, dto: Partial<CreateTaskDTO>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        body: string;
        done: boolean;
        userId: string;
    }>;
    delete(taskId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        body: string;
        done: boolean;
        userId: string;
    }>;
}
