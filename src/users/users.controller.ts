import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { UpdateUserDTO } from './dto/update-user.dto';
@Controller('/users')
@ApiTags('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User | null> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<InsertResult> {
    const result = await this.usersService.create(createUserDTO);
    return result;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<UpdateResult> {
    const res = await this.usersService.update(+id, updateUserDTO);
    return res;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    const res = await this.usersService.remove(id);
    return res;
  }
}
