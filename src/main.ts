import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppLogger } from './core/logger/logger';
import { PlainToClassPipe } from './core/pipe/plain-to-class.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  const logger = new AppLogger();
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe(), new PlainToClassPipe());

  const options = new DocumentBuilder()
    .setTitle('Bookshelf example')
    .setDescription('The bookshelf API description')
    .setVersion('1.0')
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);

  await app.listen(3000, "0.0.0.0");
  logger.setContext('Application');
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
