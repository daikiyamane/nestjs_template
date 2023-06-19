import { ApiProperty } from '@nestjs/swagger'
export class CreateUserDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  isAdmin: boolean;
}
export class UpdateUserDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  isAdmin: boolean;
}