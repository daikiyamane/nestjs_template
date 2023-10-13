import { ApiProperty } from '@nestjs/swagger';
export class LoginRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;
}
