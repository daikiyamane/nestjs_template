import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
dotenv.config();
export default defineConfig({
	schema: "./src/db/schema.ts",
	out: "./src/db/migrate",
	dialect: "mysql",
	dbCredentials: {
		host: process.env.MYSQL_HOST || "mysql",
		user: process.env.MYSQL_USER || "admin",
		password: process.env.MYSQL_PASSWORD || "secret",
		database: process.env.MYSQL_DATABASE || "nestjs_template",
		port: Number(process.env.DATABASE_PORT),
	},
});
