import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { DrizzleModule } from "src/db/db.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	imports: [PassportModule.register({ defaultStrategy: "jwt" }), DrizzleModule],
})
export class AuthModule {}
