const MYSQL_HOST = process.env.MYSQL_HOST || "mysql";
const MYSQL_USER = process.env.MYSQL_USER || "admin";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "secret";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "nestjs_template";
const MYSQL_PORT = Number(process.env.MYSQL_PORT) || 3306;
const DATABASE_URL = `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}?schema=public`;

const MYSQL_CREDENTIALS = {
	host: MYSQL_HOST,
	user: MYSQL_USER,
	database: MYSQL_DATABASE,
	password: MYSQL_PASSWORD,
	port: MYSQL_PORT,
};

const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION || "";
const AWS_USER_POOL_ID = process.env.AWS_USER_POOL_ID || "";
const AWS_USER_POOL_CLIENT_ID = process.env.AWS_USER_POOL_CLIENT_ID || "";
const AWS_ISSUER = `https://cognito-idp.${AWS_DEFAULT_REGION}.amazonaws.com/${AWS_USER_POOL_ID}`;
const AWS_JWKSURI = `${AWS_ISSUER}/.well-known/jwks.json`;

export {
	AWS_DEFAULT_REGION,
	AWS_ISSUER,
	AWS_JWKSURI,
	AWS_USER_POOL_CLIENT_ID,
	AWS_USER_POOL_ID,
	DATABASE_URL,
	MYSQL_CREDENTIALS,
	MYSQL_DATABASE,
	MYSQL_HOST,
	MYSQL_PORT,
	MYSQL_USER,
};
