import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";
@Controller()
@ApiBearerAuth()
@ApiTags("/health")
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	health(): string {
		return this.appService.health();
	}

	@Post("clip")
	clip(@Body() body: any) {
		console.log(body);
	}
}
