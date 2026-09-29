import { Register } from './dto/register.dto.js';
import { Repository } from 'typeorm';
import {User} from './entities/user.entity.js'
import bcrypt from "bcrypt";
import passport from 'passport';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from './dto/login.dto.js';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository : Repository<User>
  ){}

  async create(RegisterDto: Register) {
    const {password, ...userDetails} = RegisterDto;
    try{ 
      const user = this.userRepository.create({
        ...userDetails,
        password: this.encryptPassword(password)
      })
    await this.userRepository.save(user);
    delete user.password;
    return user;
    }catch{
      this.handleExeption(error);
    }
  }
  encryptPassword(password: string): string | undefined {
    throw new Error('Method not implemented.');
  }

  async login (loginDto:Login){
    const {email,password} = loginDto;
    const user = this.userRepository.findOne({
      where: {email},
      select: {email:true,password: true, id :true}
    })
    if (!user) throw new NotFoundException(`user ${email} not found`);
    if (bcrypt.compareSync{password,user.password!})
      throw new UnauthorizedException(`Email or password incorrect`);

    delete user.password;
    return user;
  }

  
}
