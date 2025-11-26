import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Req,
    UseGuards,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { type AuthCookieRequest } from "src/auth/interfaces/auth.cookie.request.interface";
import { CreateTaskDTO } from "./dto/create.task.dto";
@UseGuards(AuthGuard)
@Controller("task")
export class TaskController {
    constructor(private readonly taskService: TaskService) {}
    @Get()
    async getAll(@Req() req: AuthCookieRequest) {
        const userId = req.user?.sub;
        if (!userId) return;
        return await this.taskService.getAll(userId);
    }
    @Post()
    async create(@Req() req: AuthCookieRequest, @Body() body: CreateTaskDTO) {
        const userId = req.user?.sub;
        if (!userId) return;
        return await this.taskService.create(userId, body);
    }
    @Put(":id")
    @HttpCode(204)
    async update(
        @Param("id", ParseUUIDPipe) id: string,
        @Body() body: Partial<CreateTaskDTO>,
    ) {
        return await this.taskService.update(id, body);
    }
    @Delete(":id")
    @HttpCode(204)
    async delete(@Param("id", ParseUUIDPipe) id: string) {
        return await this.taskService.delete(id);
    }
}
