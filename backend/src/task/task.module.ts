import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { TaskRepository } from "./repository/task.repository";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

@Module({
    controllers: [TaskController],
    providers: [TaskService, TaskRepository],
    imports: [AuthModule],
})
export class TaskModule {}
