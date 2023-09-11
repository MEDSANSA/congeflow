import { Module, Inject } from '@nestjs/common';
import { ZeebeModule, ZeebeServer } from 'nestjs-zeebe';
import { WinstonModule } from '@payk/nestjs-winston';
import * as winston from 'winston';
import { CamundaController } from './camunda.controller';
import { CamundaService } from './camunda.service';

@Module({
  imports: [ZeebeModule.forRoot({
    gatewayAddress: 'localhost:26500',
    options: { loglevel: 'INFO', longPoll: 30000 },
  }),
  WinstonModule.forRoot({
    transports: [new winston.transports.Console()]
  })],
  controllers: [CamundaController],
  providers: [ZeebeServer, CamundaService],
})
export class CamundaModule { }