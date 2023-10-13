import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignUpRequestDto } from './dto/sign-up-request.dto';

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

  @Post('signup')
  async signUp(@Body() singUpRequest: SignUpRequestDto) {
    try {
      return await this.authService.signUp(singUpRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
