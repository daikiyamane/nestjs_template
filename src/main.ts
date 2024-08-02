import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { LoggingService } from "./logging/logging.service";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: new LoggingService(),
	});
	app.enableCors({
		origin: "*",
		allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
	});
	const config = new DocumentBuilder()
		.setTitle("Nestjs example")
		.setDescription("API description")
		.setVersion(process.env.ENV || "dev")
		.addTag("nestjs")
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);
	await app.listen(3001);
}
bootstrap();
