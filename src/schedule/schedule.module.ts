import { Module } from "@nestjs/common";
import { scheduleService } from "./schedule.service";
import { ScheduleModule as schModule} from '@nestjs/schedule'
import { AiModule } from "src/ai/ai.module";
@Module({
    
    imports:[schModule.forRoot(),AiModule],
    providers:[scheduleService]
})
export class ScheduleModule{}