import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { UsersService } from 'src/users/users.service';
import { CreateJwtDto } from './dto/create-jwt.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async createJwt({ login, password }: CreateJwtDto) {
    const user = await this.usersService.search({ login });

    if (!user) {
      throw new HttpException(
        'Bad login/password combination',
        HttpStatus.FORBIDDEN,
      );
    }

    const isPasswordCorrect = this.bcryptService.compare(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Bad login/password combination',
        HttpStatus.FORBIDDEN,
      );
    }

    const payload = { userId: user.id, login };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });

    return { token };
  }
}
