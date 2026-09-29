import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process'; 

@Module({
  controllers: [UserController],
  imports: [
   TypeOrmModule.forFeature([User]),
   PassportModule.register({defaultStrategy: 'jwt'}),
   JwtModule.registerAsync({
    imports: [ConfigModule],
    inject:[ConfigService],
    useFactory:(ConfigService: ConfigService) =>{
      return{
        secret: ConfigService.get("JWT_SECRET"),
        signOptions: {
          expiresIn: '1h' //Por estandar es 1h
        }
      }
    }
   })
  ],
  providers: [UserService, ConfigService],
  exports: [TypeOrmModule, PassportModule, JwtModule],
})
export class UserModule {}
