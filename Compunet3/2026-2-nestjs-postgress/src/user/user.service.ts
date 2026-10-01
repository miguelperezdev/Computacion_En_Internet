import { Register } from './dto/register.dto.js';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import bcrypt from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from './dto/login.dto.js';

/**
 * Usuario sin la contraseña ni los métodos de la clase: es lo único que se
 * devuelve al cliente (el resto son solo columnas de la tabla `user`).
 */
export type SafeUser = Omit<User, 'password' | 'checkEmailBeforeChanges'>;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(registerDto: Register): Promise<SafeUser> {
    const { password, ...userDetails } = registerDto;
    const user = this.userRepository.create({
      ...userDetails,
      password: this.encryptPassword(password),
    });
    const saved = await this.userRepository.save(user);
    return this.toSafeUser(saved);
  }

  encryptPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  async login(loginDto: Login): Promise<SafeUser> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({
      where: { email: email.toLowerCase().trim() },
      select: { id: true, email: true, password: true },
    });

    if (!user) {
      throw new NotFoundException(`user ${email} not found`);
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException(`Email or password incorrect`);
    }

    return this.toSafeUser(user);
  }

  private toSafeUser(user: User): SafeUser {
    const { password: _password, ...safeUser } = user;
    return safeUser;
  }
}
