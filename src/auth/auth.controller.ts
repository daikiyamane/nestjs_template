import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignUpRequestDto } from './dto/sign-up-request.dto';
import { VerifyCodeRequestDto } from './dto/verify-code-request.dto';
import { ChangePasswordRequestDto } from './dto/change-password-request.dto';
import { ForgotPasswordRequestDto } from './dto/forgot-password-request.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginRequestDto: LoginRequestDto) {
    try {
      return await this.authService.login(loginRequestDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('sign-up')
  async signUp(@Body() singUpRequest: SignUpRequestDto) {
    try {
      return await this.authService.signUp(singUpRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('verify-email')
  async verifyEmail(@Body() verifyCodeRequestDto: VerifyCodeRequestDto) {
    try {
      return await this.authService.verifyEmail(verifyCodeRequestDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('change-password')
  async changePassword(
    @Body() chagePasswordRequestDto: ChangePasswordRequestDto,
  ) {
    try {
      return await this.authService.changePassword(chagePasswordRequestDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordRequest: ForgotPasswordRequestDto,
  ) {
    try {
      return await this.authService.forgotPassword(forgotPasswordRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPassword: ForgotPasswordRequestDto) {
    try {
      return await this.authService.resetPassword(resetPassword);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
