import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':enrollment')
  @UseGuards(JwtGuard)
  getUser(@Param('enrollment') enrollment: string) {
    return this.userService.findUser({ enrollment });
  }

  // @Put()
  // @UseGuards(JwtGuard)
  // updateUser() {
  //   return this.userService.updateUser();
  // }
}
