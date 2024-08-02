import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
@Controller("users")
// @UseGuards(AuthGuard("jwt"))
// @ApiBearerAuth()
@ApiTags("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async index() {
		return this.usersService.index();
	}

	@Get(":id")
	async read(@Param("id") id: string) {
		return this.usersService.read(+id);
	}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Put(":id")
	async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(+id, updateUserDto);
	}
}
