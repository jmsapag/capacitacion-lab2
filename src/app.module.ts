import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./modules/users/user.entity";
import { TasksModule } from './modules/tasks/tasks.module';
import {Task} from "./modules/tasks/task.entity";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'postgres',
      autoLoadModels: true,
      synchronize: true,
      models: [User, Task],
    }),
      UsersModule,
      AuthModule,
      TasksModule,
  ],
    controllers: [],
    providers: [],

})
export class AppModule { }