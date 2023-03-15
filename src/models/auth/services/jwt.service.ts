import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

import { AccessTokenPayload } from '../interfaces';

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

  async generateAccessToken(payload: AccessTokenPayload): Promise<string> {
    const iat = this.generateIat();
    const expiresIn = this.ACCESS_TOKEN_EXPIRATION * 60;
    const payloadWithTime = { ...payload, iat };

    return jwt.sign(payloadWithTime, this.ACCESS_TOKEN_SECRET, { expiresIn });
  }

  async generateRefreshToken(): Promise<string> {
    const iat = this.generateIat();
    const expiresIn = this.REFRESH_TOKEN_EXPIRATION * 60 * 4 * 360;
    const payload = { iat };

    return jwt.sign(payload, this.REFRESH_TOKEN_SECRET, { expiresIn });
  }

  private generateIat(): number {
    return Math.floor(Date.now() / 1000) - 30;
  }
}
