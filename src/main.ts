import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.enableCors({ origin: false, credentials: true });
  const document = SwaggerModule.createDocument(app, new DocumentBuilder().setTitle('Annadata API').setVersion('1.0').addBearerAuth().build());
  SwaggerModule.setup('docs', app, document);
  await app.listen(Number(process.env.PORT ?? 4000));
}
void bootstrap();
