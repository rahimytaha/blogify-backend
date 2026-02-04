import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserModule } from './user/user.module';


@Module({
  imports: [UserModule],
  controllers: [],
  providers: [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'Tt9119573449',
          database: 'blogify',
          entities: [UserEntity],
          synchronize: false,
          // autoLoadEntities: true,

        });

        return dataSource.initialize();
      },
    },
  ],
})
export class AppModule {}
