import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {TasksService} from "./tasks.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {TaskDto} from "./dto/task.dto";
import {Task} from "./task.entity";


@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

/*    @Get()
    async findAll() {
        // get all posts in the db
        return await this.tasksService.findAll();
    }*/

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Task> {
        // find the post with this id
        const task = await this.tasksService.findOne(id);

        // if the post doesn't exit in the db, throw a 404 error
        if (!task) {
            throw new NotFoundException('This Task doesn\'t exist');
        }

        // if post exist, return the post
        return task;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findTasks(@Request() req) {
        // Extract the user ID from the JWT token
        const userId = req.user.id;

        // Fetch tasks for the current user
        return await this.tasksService.findAllByUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() task: TaskDto, @Request() req): Promise<Task> {
        // create a new post and return the newly created post
        return await this.tasksService.create(task, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() task: TaskDto, @Request() req): Promise<Task> {
        // get the number of row affected and the updated post
        const { numberOfAffectedRows, updatedTask } = await this.tasksService.update(id, task, req.user.id);

        // if the number of row affected is zero,
        // it means the post doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Task doesn\'t exist');
        }

        // return the updated post
        return updatedTask;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the post with this id
        const deleted = await this.tasksService.delete(id, req.user.id);

        // if the number of row affected is zero,
        // then the post doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This Task doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}
