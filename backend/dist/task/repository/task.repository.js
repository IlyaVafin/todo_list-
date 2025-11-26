"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TaskRepository = class TaskRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAll(userId) {
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
        });
    }
    async create(userId, dto) {
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
    async update(taskId, dto) {
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
    async delete(taskId) {
        return await this.prismaService.task.delete({
            where: {
                id: taskId,
            },
        });
    }
};
exports.TaskRepository = TaskRepository;
exports.TaskRepository = TaskRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TaskRepository);
//# sourceMappingURL=task.repository.js.map