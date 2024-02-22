import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { passportJwtSecret } from "jwks-rsa";
import { ExtractJwt, Strategy } from "passport-jwt";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	private readonly logger = new Logger(JwtStrategy.name);
	constructor(private readonly configService: ConfigService) {
		super({
			secretOrKeyProvider: passportJwtSecret({
				cache: true,
				rateLimit: true,
				jwksRequestsPerMinute: 5,
				jwksUri: configService.get<string>("AWS_JWKSURI") || "",
			}),

			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			audience: configService.get<string>("AWS_USER_POOL_CLIENT_ID") || "",
			issuer: configService.get<string>("AWS_ISSUER") || "",
			algorithms: ["RS256"],
		});
	}

	async validate(payload: any) {
		return { idUser: payload.sub, email: payload.email };
	}
}
