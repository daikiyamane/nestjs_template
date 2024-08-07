import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Req,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import type { AuthService } from "./auth.service";
import type {
	ChangePasswordRequestDto,
	ForgotPasswordRequestDto,
	LoginRequestDto,
	SignUpRequestDto,
	VerifyCodeRequestDto,
} from "./dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@ApiBearerAuth()
	@UseGuards(AuthGuard("jwt"))
	@Get("whoami")
	whoami(@Req() requset: Request) {
		console.log(requset);
	}

	@Post("login")
	async login(@Body() loginRequestDto: LoginRequestDto) {
		try {
			return await this.authService.login(loginRequestDto);
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	@Post("sign-up")
	async signUp(@Body() singUpRequest: SignUpRequestDto) {
		try {
			return await this.authService.signUp(singUpRequest);
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	@Post("verify-email")
	async verifyEmail(@Body() verifyCodeRequestDto: VerifyCodeRequestDto) {
		try {
			return await this.authService.verifyEmail(verifyCodeRequestDto);
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	@Post("change-password")
	async changePassword(
		@Body() chagePasswordRequestDto: ChangePasswordRequestDto,
	) {
		try {
			return await this.authService.changePassword(chagePasswordRequestDto);
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	@Post("forgot-password")
	async forgotPassword(
		@Body() forgotPasswordRequest: ForgotPasswordRequestDto,
	) {
		try {
			return await this.authService.forgotPassword(forgotPasswordRequest);
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	@Post("reset-password")
	async resetPassword(@Body() resetPassword: ForgotPasswordRequestDto) {
		try {
			return await this.authService.resetPassword(resetPassword);
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}
}
