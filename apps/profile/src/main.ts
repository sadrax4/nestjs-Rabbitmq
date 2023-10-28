import { NestFactory } from '@nestjs/core';
import { ProfileModule } from './profile.module';
import { RmqService } from '@app/cammon';
import { RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ProfileModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions("PROFILE", true));
  app.startAllMicroservices();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3002);
}
bootstrap();
