import { Message } from '../interfaces/message.interface';
export declare class MessageProcessorService {
    private readonly logger;
    processMessage(message: Message): Promise<void>;
}
