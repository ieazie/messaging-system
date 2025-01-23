import { Processor, WorkerHost } from '@nestjs/bullmq';
import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Job } from 'bullmq';

import { Message } from '../interfaces/message.interface';
import { MessageProcessorService } from '../services/message-processor.service';

@Processor('message-queue')
@Injectable()
export class MessageQueueProcessor
  extends WorkerHost
  implements OnApplicationShutdown, OnModuleInit
{
  private readonly logger = new Logger(MessageQueueProcessor.name);

  constructor(
    private readonly messageProcessorService: MessageProcessorService,
  ) {
    super();
  }

  async process(job: Job<Message>): Promise<void> {
    const message = job.data;
    this.logger.log(`Processing message ID: ${message.id}`);
    try {
      await this.messageProcessorService.processMessage(message);
      this.logger.log(`Successfully processed  message ID: ${message.id}`);
    } catch (error) {
      this.logger.error(
        `Error processing message ID: ${message.id} (Attempt: ${job.attemptsMade}): ${error.message}`,
      );
      throw error;
    }
  }

  async onFailed(job: Job<Message>, error: Error): Promise<void> {
    const message = job.data;

    if (job.attemptsMade >= message.maxRetries) {
      this.logger.error(
        `Message ID: ${message.id} discarded after ${job.attemptsMade} attempts. Error: ${error.message}`,
      );
    }

    await this.handleFailedMessage(message);
  }

  private async handleFailedMessage(message: Message): Promise<void> {
    // Save the message to a database or DLQ
    this.logger.warn(`Gracefully handling failed message ID: ${message.id}`);
  }

  async onApplicationShutdown(): Promise<void> {
    await this.worker.close(); // Close the worker to prevent residual instances
    this.logger.log('[QUEUE PROCESSOR] Worker has been gracefully shutdown.');
  }

  async onModuleInit(): Promise<void> {
    this.worker.on('failed', this.onFailed.bind(this));
  }
}
