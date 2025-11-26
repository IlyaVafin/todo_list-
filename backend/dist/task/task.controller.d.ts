import { TaskService } from "./task.service";
import { type AuthCookieRequest } from "src/auth/interfaces/auth.cookie.request.interface";
import { CreateTaskDTO } from "./dto/create.task.dto";
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getAll(req: AuthCookieRequest): Promise<{
        id: string;
        title: string;
        body: string;
        done: boolean;
    }[] | undefined>;
    create(req: AuthCookieRequest, body: CreateTaskDTO): Promise<{
        message: string;
        task: {
            id: string;
        };
    } | undefined>;
    update(id: string, body: Partial<CreateTaskDTO>): Promise<void>;
    delete(id: string): Promise<{
        id: string;
        title: string;
        body: string;
        done: boolean;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
