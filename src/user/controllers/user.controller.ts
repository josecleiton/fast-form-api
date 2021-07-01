import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { GetUser } from '../decoratos/get-user.decorator';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  getUser(@GetUser() user: User) {
    return user;
  }

  @Put()
  @UseGuards(JwtGuard)
  updateUser(@Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.userService.updateUser(user.enrollment, updateUserDto);
  }
}
