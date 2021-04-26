import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { GetUser } from '../decoratos/get-user.decorator';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

@Controller('user')
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

  // @Put()
  // @UseGuards(JwtGuard)
  // updateUser() {
  //   return this.userService.updateUser();
  // }
}
