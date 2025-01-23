import { Queue } from 'bullmq';
import { Message } from '../interfaces/message.interface';
export declare class MessageProducerService {
    private readonly queue;
    private readonly logger;
    constructor(queue: Queue);
    enqueueMessage(message: Message): Promise<void>;
}
