import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global: todas las rutas quedan bajo /api. Cada controlador
  // agrega el suyo encima, por eso student expone /api/student.
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // Sin transform los DTOs llegan como objetos planos y @Type(() => Number)
      // de PaginationDto se descarta: los query params seguirían siendo strings.
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 9000);
}
await bootstrap();
