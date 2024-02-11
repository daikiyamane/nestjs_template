import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity implements User {
	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string | null;

	@ApiProperty()
	email: string;

	@ApiProperty()
	remark: string | null;

	@ApiProperty()
	isAdmin: boolean;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;
}
