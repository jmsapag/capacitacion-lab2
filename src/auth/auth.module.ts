import {Module} from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import * as process from "node:process";

@Module({
    imports: [
        PassportModule,
        UserModule,
        JwtModule.register({
            secret: process.env.JWTKEY,
            signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}