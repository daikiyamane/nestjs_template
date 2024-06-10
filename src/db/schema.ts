import { sql } from "drizzle-orm";
import {
	boolean,
	mysqlTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
	id: serial("id").primaryKey(),
	email: varchar("email", { length: 256 }).unique().notNull(),
	name: varchar("name", { length: 256 }).notNull(),
	isAdmin: boolean("is_admin").default(false).notNull(),
	detail: text("detail").notNull(),
	createdAt: timestamp("created_at", { mode: "date" })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" })
		.default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`)
		.notNull(),
});
