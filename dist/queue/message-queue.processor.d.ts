import { WorkerHost } from '@nestjs/bullmq';
import { OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Job } from 'bullmq';
import { Message } from '../interfaces/message.interface';
import { MessageProcessorService } from '../services/message-processor.service';
export declare class MessageQueueProcessor extends WorkerHost implements OnApplicationShutdown, OnModuleInit {
    private readonly messageProcessorService;
    private readonly logger;
    constructor(messageProcessorService: MessageProcessorService);
    process(job: Job<Message>): Promise<void>;
    onFailed(job: Job<Message>, error: Error): Promise<void>;
    private handleFailedMessage;
    onApplicationShutdown(): Promise<void>;
    onModuleInit(): Promise<void>;
}
