import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { MessageProducerService } from './services/message-producer.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  const messageProducerService = app.get(MessageProducerService);

  const messages = [
    {
      id: '1',
      text: 'High priority',
      priority: 1,
      retries: 0,
      maxRetries: 3,
    },
    {
      id: '2',
      text: 'Low priority',
      priority: 5,
      retries: 0,
      maxRetries: 3,
    },
    {
      id: '3',
      text: 'Medium priority',
      priority: 3,
      retries: 0,
      maxRetries: 3,
    },
  ];

  for (const message of messages) {
    await messageProducerService.enqueueMessage(message);
  }

  logger.log('Message processing system running...');
  await app.listen(process.env.PORT ?? 3700);
}
bootstrap();
