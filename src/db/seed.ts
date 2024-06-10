// db/seed.ts
import * as mysql2 from "mysql2/promise";

import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";
const main = async () => {
	const connection = await mysql2.createConnection({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		database: process.env.MYSQL_DATABASE,
		password: process.env.MYSQL_PASSWORD,
		port: Number(process.env.DATABASE_PORT),
	});
	const db = drizzle(connection, {
		schema: schema,
		mode: "default",
		logger: true,
	}) as MySql2Database<typeof schema>;

	await db.insert(schema.users).values({
		name: "test1",
		email: "daiki04752@gmail.com",
		detail: "",
	});

	connection.end();
};
main();
