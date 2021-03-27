import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDocument } from 'src/user/schemas/user.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    const user = request.user as UserDocument;
    return await this.service.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async user(@Request() request) {
    console.log('User');

    return request.user;
  }
}
