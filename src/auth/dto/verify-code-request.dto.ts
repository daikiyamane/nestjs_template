import { ApiProperty } from "@nestjs/swagger";
export class VerifyCodeRequestDto {
	@ApiProperty()
	name: string;

	@ApiProperty()
	code: string;
}
