import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { RolesGuard } from './auth/roles.guard';
import { CongeService } from './conge/conges.service';
import { CongeModule } from './conge/conges.module';
import { CamundaService } from './camunda/camunda.service';
import { CamundaModule } from './camunda/camunda.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://azizsansa4:MsO49aUX44PjGAF2@cluster0.cxxca2v.mongodb.net/'), UsersModule, AuthModule, CongeModule, CamundaModule],
  controllers: [AppController],
  providers: [{
    provide: 'APP_GUARD',
    useClass: RolesGuard,
  }],
})
export class AppModule { }
