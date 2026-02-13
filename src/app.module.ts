import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BlogEntity } from './entities/blog.entity';
import { BlogModule } from './blog/blog.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    UserModule,
    AiModule,
    BlogModule,
    AuthModule,
    ScheduleModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: (configService.get<string>('DB_TYPE') as 'postgres') || 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [UserEntity, BlogEntity],
        synchronize: false,
        // logging: configService.get<string>('NODE_ENV') !== 'production',
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
