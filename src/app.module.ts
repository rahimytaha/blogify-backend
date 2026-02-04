import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DataSource } from 'typeorm';


@Module({
  imports: [],
  controllers: [AppController],
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
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        });

        return dataSource.initialize();
      },
    },
  ],
})
export class AppModule {}
