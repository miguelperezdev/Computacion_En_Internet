import { Controller, Post, Body} from '@nestjs/common';
import { UserService } from './user.service.js';
import { Login } from './dto/login.dto.js';
import { Register } from './dto/register.dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("singup")
  create(@Body() registerUserDto: Register) {
    return this.userService.create(resgisterDto);
  }

  @Post("auth")
  login(@Body() loginDto: Login){
    return this.userService.login(loginDto);
  }


}
