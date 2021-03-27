import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<UserDocument> {
    console.log('validate user called');

    const user = await this.authService.validateUser(email, password);

    console.log('\n\n\n\n\nLocalStrategy -> validate()', user);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
