import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('NestJs API')
    .setDescription('Documented REST API')
    .setVersion('1.0.0')
    .addTag('anival-github')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);

  await app.listen(process.env.PORT);

  // ToDo uncomment to check exceptions catching and logging
  // throw Error('Oops!');
  // Promise.reject(Error('Oops!'));
}
bootstrap();
