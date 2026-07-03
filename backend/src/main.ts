import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform:true, //transform to actual DTO so can use methods, not just passing an object that matches DTO
  }),
);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
