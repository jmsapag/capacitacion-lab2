import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./modules/users/user.entity";

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
      models: [User],
    }),
      UsersModule,
      AuthModule,
  ],
    controllers: [],
    providers: [],

})
export class AppModule { }