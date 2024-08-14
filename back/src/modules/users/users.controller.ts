import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        // The `req.user` will contain the validated user information from the token
        return await this.usersService.findOneById(req.user.id);
    }
}
