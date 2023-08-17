import { Module } from '@nestjs/common';
import { CongeController } from './conges.controller';
import { CongeService } from './conges.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CongeSchema } from './conges.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Conge', schema: CongeSchema }]), UsersModule],
  controllers: [CongeController],
  providers: [CongeService],
  exports: [CongeService]
})
export class CongeModule { }
