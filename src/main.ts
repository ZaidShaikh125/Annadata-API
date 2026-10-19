import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { randomUUID } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use((request: Request, response: Response, next: NextFunction) => { const requestId = request.header('x-request-id')?.slice(0, 128) || randomUUID(); response.setHeader('x-request-id', requestId); if(request.path.startsWith('/api/v1/admin'))response.setHeader('Cache-Control','no-store, private'); next(); });
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.enableCors({ origin: false, credentials: true });
  const document = SwaggerModule.createDocument(app, new DocumentBuilder().setTitle('Annadata API').setVersion('1.0').addBearerAuth().build());
  SwaggerModule.setup('docs', app, document);
  await app.listen(Number(process.env.PORT ?? 4000));
}
void bootstrap();
