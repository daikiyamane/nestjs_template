import { join } from 'path';
import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

const dbConfig = new DataSource({
  type: 'mysql',
  host: 'mysql',
  port: 3306,
  username: 'admin',
  password: 'secret',
  database: 'nestjs_template',
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../migrations/**/*{.ts,.js}')],
  synchronize: false,
});

Logger.debug(dbConfig);

export default dbConfig;
