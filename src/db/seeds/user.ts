import type { MySql2Database } from "drizzle-orm/mysql2";
import * as schema from "../schema";

export async function run(db: MySql2Database<typeof schema>) {
	await db.insert(schema.users).values({
		name: "test1",
		email: "daiki04752@gmail.com",
		detail: "",
	});
}
