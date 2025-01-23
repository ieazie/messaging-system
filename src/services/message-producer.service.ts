import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import { Message } from '../interfaces/message.interface';

@Injectable()
export class MessageProducerService {
  private readonly logger = new Logger('Producer Service');
  constructor(
    @InjectQueue('message-queue')
    private readonly queue: Queue,
  ) {}

  async enqueueMessage(message: Message): Promise<void> {
    await this.queue.add('process-message', message, {
      priority: message.priority,
      attempts: message.maxRetries,
      backoff: { type: 'exponential', delay: 1000 },
    });
    this.logger.log(
      `[PRODUCER] Enqueued message ID: ${message.id} with priority ${message.priority}`,
    );
  }
}
