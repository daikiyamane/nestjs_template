import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import type { AppService } from "./app.service";
@Controller()
@ApiBearerAuth()
@ApiTags("/health")
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	health(): string {
		return this.appService.health();
	}
}
