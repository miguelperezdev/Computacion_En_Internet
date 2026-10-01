import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module.js';  
import { UserModule } from './user/user.module.js';
import { SeedModule } from './seed/seed.module.js';



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:"postgres",
      host: process.env.DB_HOST,
      // La variable llega como string: el + unario la convierte a número
      // (con +! se negaba antes y el puerto quedaba siempre en 0).
      port: +(process.env.DB_PORT ?? 5432),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities:true,
      synchronize: true // solo usarla en ambientes bajos, no usar en produccion
    }),
    StudentModule,
    UserModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
