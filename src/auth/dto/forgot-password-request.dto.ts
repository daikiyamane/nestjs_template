import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordRequestDto {
	@ApiProperty()
	name: string;

	@ApiProperty()
	code: string;

	@ApiProperty()
	password: string;
}
