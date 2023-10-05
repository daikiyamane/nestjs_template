import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.user(+id);
  }

  @Get()
  async users(): Promise<User[]> {
    return this.usersService.users();
  }

  @Post()
  async createUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<User> {
    return this.usersService.createUser(userData);
  }

  @Put(':id')
  async putUser(
    @Param('id') id: string,
    @Body() userData: { name?: string; email: string },
  ): Promise<User> {
    return this.usersService.updateUser(+id, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUser(+id);
  }
}
