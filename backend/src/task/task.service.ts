import { Injectable } from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create.task.dto";
import { TaskRepository } from "./repository/task.repository";

@Injectable()
export class TaskService {
    constructor(private readonly taskRepository: TaskRepository) {}
    async getAll(userId: string) {
        return await this.taskRepository.getAll(userId);
    }
    async create(userId: string, dto: CreateTaskDTO) {
        const task = await this.taskRepository.create(userId, dto);
        return {
            message: "Successfully created",
            task: {
                id: task.id,
            },
        };
    }
    async update(taskId: string, dto: Partial<CreateTaskDTO>) {
        await this.taskRepository.update(taskId, dto);
    }
    async delete(taskId: string) {
        return await this.taskRepository.delete(taskId);
    }
}
