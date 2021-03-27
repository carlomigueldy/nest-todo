import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();

  // all routes prefixed with '/api'
  app.setGlobalPrefix('api');
  
  await app.listen(parseInt(process.env.APP_PORT, 10) || 3000);
  console.log(
    `[App] App server started, listening at port ${process.env.APP_PORT}`,
  );
}
bootstrap();
