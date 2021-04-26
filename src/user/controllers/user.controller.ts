import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../user.service';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // @Put()
  // @UseGuards(JwtGuard)
  // updateUser() {
  //   return this.userService.updateUser();
  // }
}
