import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module.js';  



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:"postgres",
      host: process.env.DB_HOST,
      //PASS DE STRING A NUMBER PARA ESO ES EL +!
      port: +!process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities:true,
      synchronize: true // solo usarla en ambientes bajos, no usar en produccion
    }),
    StudentModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
