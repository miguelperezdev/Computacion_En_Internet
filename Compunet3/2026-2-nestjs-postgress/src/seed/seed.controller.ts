import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service.js';

/** GET /api/seed — carga los estudiantes de prueba (borra los existentes). */
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSeed() {
    return this.seedService.runSeed();
  }
}
