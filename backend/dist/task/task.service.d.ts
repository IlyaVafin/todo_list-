import { CreateTaskDTO } from "./dto/create.task.dto";
import { TaskRepository } from "./repository/task.repository";
export declare class TaskService {
    private readonly taskRepository;
    constructor(taskRepository: TaskRepository);
    getAll(userId: string): Promise<{
        id: string;
        title: string;
        body: string;
        done: boolean;
    }[]>;
    create(userId: string, dto: CreateTaskDTO): Promise<{
        message: string;
        task: {
            id: string;
        };
    }>;
    update(taskId: string, dto: Partial<CreateTaskDTO>): Promise<void>;
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
