import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { queueConfig } from './queue/config/queue.config';
import { MessageProcessorService } from './services/message-processor.service';
import { MessageProducerService } from './services/message-producer.service';
import { MessageQueueProcessor } from './queue/message-queue.processor';

@Module({
  imports: [
    BullModule.forRoot(queueConfig),
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  providers: [
    MessageProcessorService,
    MessageProducerService,
    MessageQueueProcessor,
  ],
})
export class AppModule {}
