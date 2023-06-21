import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Set up request validation
  app.useGlobalPipes(new ValidationPipe());

  // Set up Swagger API documentation
  const options = new DocumentBuilder()
    .setTitle('Form API')
    .setDescription('API for form submission')
    .setVersion('1.0')
    .addTag('forms')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
