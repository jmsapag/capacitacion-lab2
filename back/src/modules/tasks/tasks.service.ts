import { Injectable, Inject } from '@nestjs/common';

import { User } from '../users/user.entity';
import { TASK_REPOSITORY } from '../../core/constants';
import {Task} from "./task.entity";
import {TaskDto} from "./dto/task.dto";

@Injectable()
export class TasksService {
    constructor(@Inject(TASK_REPOSITORY) private readonly taskRepository: typeof Task) { }

    async create(task: TaskDto, userId): Promise<Task> {
        return await this.taskRepository.create<Task>({ ...task, userId });
    }

    async findAll(): Promise<Task[]> {
        return await this.taskRepository.findAll<Task>({
            include: [{ model: User, attributes: { exclude: ['password'] } }],
        });
    }

    async findOne(id): Promise<Task> {
        return await this.taskRepository.findOne({
            rejectOnEmpty: undefined,
            where: { id },
            include: [{ model: User, attributes: { exclude: ['password'] } }]
        });
    }

    async delete(id, userId) {
        return await this.taskRepository.destroy({ where: { id, userId } });
    }

    async update(id, data, userId) {
        const [numberOfAffectedRows, [updatedTask]] = await this.taskRepository.update({ ...data }, { where: { id, userId }, returning: true });

        return { numberOfAffectedRows, updatedTask };
    }

    async findAllByUser(userId: number): Promise<Task[]> {
        return await this.taskRepository.findAll<Task>({
            where: { userId },
            include: [{ model: User, attributes: { exclude: ['password'] } }],
        });
    }
}
