import { defineConfig } from "drizzle-kit";
import { MYSQL_CREDENTIALS } from "src/config";
export default defineConfig({
	schema: "./src/db/schema.ts",
	out: "./src/db/migrate",
	dialect: "mysql",
	dbCredentials: MYSQL_CREDENTIALS,
});
