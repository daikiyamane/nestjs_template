import { ApiProperty } from '@nestjs/swagger';
export class ChangePasswordRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  old_password: string;

  @ApiProperty()
  password: string;
}
