import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*'
  });
  await app.listen(5000);
}
bootstrap();
