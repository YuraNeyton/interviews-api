import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

import { TokenType } from '../enums';

import { TokenPayload } from '../../models';

@Injectable()
export class JwtService {
  private readonly ACCESS_TOKEN_SECRET: string;
  private readonly REFRESH_TOKEN_SECRET: string;
  private readonly ACCESS_TOKEN_EXPIRATION: number;
  private readonly REFRESH_TOKEN_EXPIRATION: number;

  constructor(private configService: ConfigService) {
    this.ACCESS_TOKEN_SECRET = this.configService.get<string>('access_token_secret');
    this.REFRESH_TOKEN_SECRET = this.configService.get<string>('refresh_token_secret');
    this.ACCESS_TOKEN_EXPIRATION = Number(this.configService.get<string>('access_token_expiration'));
    this.REFRESH_TOKEN_EXPIRATION = Number(this.configService.get<string>('refresh_token_expiration'));
  }

  generateToken(payload: TokenPayload, type: TokenType): string {
    const iat = this.generateIat();
    const expiresIn = this.getTokenExp(type);
    const secret = this.getTokenSecret(type);
    const payloadWithIat = { ...payload, iat };

    return jwt.sign(payloadWithIat, secret, { expiresIn });
  }

  validate(token: string, type: TokenType): TokenPayload {
    return jwt.verify(token, this.getTokenSecret(type)) as TokenPayload;
  }

  private generateIat(): number {
    return Math.floor(Date.now() / 1000) - 30; // 30 ces
  }

  private getTokenExp(type: TokenType): number {
    const defaultExp = 900; // default 15 min

    const expMap = {
      [TokenType.ACCESS]: this.ACCESS_TOKEN_EXPIRATION * 60, // 15 min
      [TokenType.REFRESH]: this.REFRESH_TOKEN_EXPIRATION * 60 * 4 * 360 // 15 days
    };

    return expMap[type] || defaultExp;
  }

  private getTokenSecret(type: TokenType): string {
    const defaultSecret = this.ACCESS_TOKEN_SECRET;
    const secretMap = {
      [TokenType.ACCESS]: this.ACCESS_TOKEN_SECRET,
      [TokenType.REFRESH]: this.REFRESH_TOKEN_SECRET
    };

    return secretMap[type] || defaultSecret;
  }
}

