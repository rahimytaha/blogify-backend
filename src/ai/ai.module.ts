import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AiService } from './ai.service';
import { BlogModule } from 'src/blog/blog.module';

@Module({
  imports: [BlogModule],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
