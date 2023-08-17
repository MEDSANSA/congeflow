import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from './users.service';
import { UserSchema } from './users.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule]
})
export class UsersModule { }
