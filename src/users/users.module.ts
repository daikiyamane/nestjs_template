import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/db/db.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [DrizzleModule],
})
export class UsersModule {}
