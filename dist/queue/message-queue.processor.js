"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MessageQueueProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageQueueProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const message_processor_service_1 = require("../services/message-processor.service");
let MessageQueueProcessor = MessageQueueProcessor_1 = class MessageQueueProcessor extends bullmq_1.WorkerHost {
    constructor(messageProcessorService) {
        super();
        this.messageProcessorService = messageProcessorService;
        this.logger = new common_1.Logger(MessageQueueProcessor_1.name);
    }
    async process(job) {
        const message = job.data;
        this.logger.log(`Processing message ID: ${message.id}`);
        try {
            await this.messageProcessorService.processMessage(message);
            this.logger.log(`Successfully processed  message ID: ${message.id}`);
        }
        catch (error) {
            this.logger.error(`Error processing message ID: ${message.id} (Attempt: ${job.attemptsMade}): ${error.message}`);
            throw error;
        }
    }
    async onFailed(job, error) {
        const message = job.data;
        if (job.attemptsMade >= message.maxRetries) {
            this.logger.error(`Message ID: ${message.id} discarded after ${job.attemptsMade} attempts. Error: ${error.message}`);
        }
        await this.handleFailedMessage(message);
    }
    async handleFailedMessage(message) {
        this.logger.warn(`Gracefully handling failed message ID: ${message.id}`);
    }
    async onApplicationShutdown() {
        await this.worker.close();
        this.logger.log('[QUEUE PROCESSOR] Worker has been gracefully shutdown.');
    }
    async onModuleInit() {
        this.worker.on('failed', this.onFailed.bind(this));
    }
};
exports.MessageQueueProcessor = MessageQueueProcessor;
exports.MessageQueueProcessor = MessageQueueProcessor = MessageQueueProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('message-queue'),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [message_processor_service_1.MessageProcessorService])
], MessageQueueProcessor);
//# sourceMappingURL=message-queue.processor.js.map