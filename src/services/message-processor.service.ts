import { Injectable, Logger } from '@nestjs/common';

import { Message } from '../interfaces/message.interface';

@Injectable()
export class MessageProcessorService {
  private readonly logger = new Logger('Messaging Service');
  async processMessage(message: Message): Promise<void> {
    this.logger.log(`[PROCESSOR] Start processing message ID: ${message.id}`);
    if (Math.random() < 0.3) {
      // Simulate a 30% failure rate
      throw new Error('Simulated failure for message ID: ' + message.id);
    }
    this.logger.log(
      `[PROCESSOR] Message ID: ${message.id} processed successfully`,
    );
  }
}
