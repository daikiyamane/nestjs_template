import * as mysql2 from "mysql2/promise";

const dbConfig: mysql2.ConnectionOptions = {
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	database: process.env.MYSQL_DATABASE,
	password: process.env.MYSQL_PASSWORD,
	port: Number(process.env.DATABASE_PORT),
};

export default dbConfig;
