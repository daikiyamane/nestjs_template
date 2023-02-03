import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { CreateUserDTO } from './user.dto';
import { InsertResult } from 'typeorm';
@Controller()
@ApiTags('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/users')
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/users/:id')
  async getUser(@Param('id') id: number): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Post('/users')
  async createUser(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<InsertResult> {
    const result = await this.usersService.create(createUserDTO);
    return result;
  }
}
