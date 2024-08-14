import * as dotenv from 'dotenv';
dotenv.config();

export const databaseConfig = {
    development: {
        dialect: process.env.DB_DIALECT as any,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_DEVELOPMENT,
        autoLoadModels: true,
        synchronize: true,
    },
    test: {
        dialect: process.env.DB_DIALECT as any,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_TEST,
        autoLoadModels: true,
        synchronize: true,
    },
    production: {
        dialect: process.env.DB_DIALECT as any,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_PRODUCTION,
        autoLoadModels: true,
        synchronize: true,
    },
};
