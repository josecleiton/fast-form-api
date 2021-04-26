import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './controllers/user.controller';
import { ProfessorRepository } from './repositories/professor.repository';
import { StudentRepository } from './repositories/student.repository';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      StudentRepository,
      ProfessorRepository,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
