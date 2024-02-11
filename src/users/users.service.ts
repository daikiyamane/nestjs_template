import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async user(id: number): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { id },
		});
	}

	async users(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		return this.prisma.user.update({
			data: updateUserDto,
			where: { id },
		});
	}
}
