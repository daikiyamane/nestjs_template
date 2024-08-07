import { Injectable, Logger } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { passportJwtSecret } from "jwks-rsa";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AWS_ISSUER, AWS_JWKSURI, AWS_USER_POOL_CLIENT_ID } from "src/config";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	private readonly logger = new Logger(JwtStrategy.name);
	constructor(private readonly configService: ConfigService) {
		super({
			secretOrKeyProvider: passportJwtSecret({
				cache: true,
				rateLimit: true,
				jwksRequestsPerMinute: 5,
				jwksUri: AWS_JWKSURI,
			}),

			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			audience: AWS_USER_POOL_CLIENT_ID,
			issuer: AWS_ISSUER,
			algorithms: ["RS256"],
		});
	}

	async validate(payload: any) {
		return { idUser: payload.sub, email: payload.email };
	}
}
