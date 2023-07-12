import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: string;

  @ApiProperty()
  isActive: boolean;
}
