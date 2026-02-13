import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AiService } from 'src/ai/ai.service';

@Injectable()
export class scheduleService {
  private readonly logger = new Logger();
  constructor(private AiService: AiService) {}
  @Cron('1 * * * * *')
  async handle() {
    this.logger.log('start create automatic blog');
    await this.AiService.createBlog();
  }
}
