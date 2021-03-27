import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log('JwtStrategy -> constructor()');
    super({
      usernameField: 'email',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET || 'CARLO_MIGUEL_DY',
      secret: process.env.JWT_SECRET || 'CARLO_MIGUEL_DY',
    });
  }

  async validate(payload: any) {
    console.log('JwtStrategy -> validate()', payload);

    return payload;
  }
}
