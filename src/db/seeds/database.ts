import { type MySql2Database, drizzle } from "drizzle-orm/mysql2";

import * as mysql2 from "mysql2/promise";
import { MYSQL_CREDENTIALS } from "src/config";
import * as schema from "../schema";
import * as user from "./user";
const main = async () => {
	const connection = await mysql2.createConnection(MYSQL_CREDENTIALS);
	const db = drizzle(connection, {
		schema: schema,
		mode: "default",
		logger: true,
	}) as MySql2Database<typeof schema>;

	await user.run(db);

	connection.end();
};
main();
