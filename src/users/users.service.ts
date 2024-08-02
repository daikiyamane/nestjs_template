import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import { dbAsyncProvider } from "src/db/db.provider";
import * as schema from "../db/schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
@Injectable()
export class UsersService {
	constructor(
		@Inject(dbAsyncProvider) private db: MySql2Database<typeof schema>,
	) {}

	async index() {
		return await this.db.query.users.findMany();
	}

	async read(id: number) {
		const user = await this.db.query.users.findFirst({
			where: eq(schema.users.id, id),
		});
		return user;
	}

	async create(createUserDto: CreateUserDto) {
		const [res] = await this.db
			.insert(schema.users)
			.values({ ...createUserDto });
		const newUser = await this.db.query.users.findFirst({
			where: eq(schema.users.id, res.insertId),
		});
		return newUser;
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		await this.db
			.update(schema.users)
			.set(updateUserDto)
			.where(eq(schema.users.id, id));
		const updatedUser = await this.db.query.users.findFirst({
			where: eq(schema.users.id, id),
		});
		return updatedUser;
	}
}
