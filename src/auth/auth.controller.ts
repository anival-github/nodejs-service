import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateJwtDto } from './dto/create-jwt.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  createJwt(@Body() createJwtDto: CreateJwtDto) {
    return this.authService.createJwt(createJwtDto);
  }
}
