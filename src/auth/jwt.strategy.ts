import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://cognito-idp.${
          configService.get<string>('AWS_DEFAULT_REGION') || ''
        }.amazonaws.com/${
          configService.get<string>('AWS_USER_POOL_ID') || ''
        }/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get<string>('AWS_USER_POOL_CLIENT_ID') || '',
      issuer: `https://cognito-idp.${
        configService.get<string>('AWS_DEFAULT_REGION') || ''
      }.amazonaws.com/${configService.get<string>('AWS_USER_POOL_ID') || ''}`,
      algorithms: ['RS256'],
    });
  }

  public async validate(payload: any) {
    console.log(payload);
    return !!payload.sub;
  }
}
