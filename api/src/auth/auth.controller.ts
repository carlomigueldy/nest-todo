import {
  Body,
  Controller,
  HttpCode,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async loginWithEmail(@Body() authDto: AuthLoginDto) {
    const user = await this.service.validateUser(authDto.email, authDto.password);

    console.log(user)

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
