import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller.js';
import { SeedService } from './seed.service.js';
import { StudentModule } from '../student/student.module.js';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [StudentModule],
})
export class SeedModule {}
