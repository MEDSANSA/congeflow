import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZeebeServer } from 'nestjs-zeebe';
import { WINSTON_MODULE_NEST_PROVIDER } from '@payk/nestjs-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const microservice = app.connectMicroservice({
    strategy: app.get(ZeebeServer),
  });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.startAllMicroservices();

  await app.listen(5000);
}
bootstrap();
