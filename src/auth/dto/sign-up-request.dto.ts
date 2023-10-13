import { ApiProperty } from '@nestjs/swagger';
export class SignUpRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
