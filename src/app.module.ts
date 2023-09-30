import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ExamplesModule } from './examples/examples.module';
import { HttpModule } from '@nestjs/axios';
import { Example } from './examples/entities/example.entity';
import { UsersController } from './users/users.controller';
import { ExamplesController } from './examples/examples.controller';
import { UsersService } from './users/users.service';
import { ExamplesService } from './examples/examples.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: 3306,
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [User, Example],
        migrations: ['src/migrations/*.{js, ts}'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ExamplesModule,
    HttpModule,
  ],
  controllers: [AppController, UsersController, ExamplesController],
  providers: [AppService, UsersService, ExamplesService],
})
export class AppModule {}
