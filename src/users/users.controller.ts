import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
@Controller("users")
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
@ApiTags("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get(":id")
	async findUserById(@Param("id") id: string): Promise<User | null> {
		return this.usersService.user(+id);
	}

	@Get()
	async users(): Promise<User[]> {
		return this.usersService.users();
	}

	@Put(":id")
	async putUser(
		@Param("id") id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<User> {
		return this.usersService.updateUser(+id, updateUserDto);
	}
}
