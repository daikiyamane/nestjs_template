import { type MySql2Database, drizzle } from "drizzle-orm/mysql2";
import * as mysql2 from "mysql2/promise";
import { MYSQL_CREDENTIALS } from "src/config";
import * as schema from "./schema";
export const dbAsyncProvider = "dbProvider";

export const dbProvider = [
	{
		provide: dbAsyncProvider,
		useFactory: async () => {
			const connection = await mysql2.createConnection(
				MYSQL_CREDENTIALS as mysql2.ConnectionOptions,
			);
			const db = drizzle(connection, {
				schema: schema,
				mode: "default",
				logger: true,
			}) as MySql2Database<typeof schema>;
			return db;
		},
		exports: [dbAsyncProvider],
	},
];
