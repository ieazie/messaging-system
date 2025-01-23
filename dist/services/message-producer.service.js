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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageProducerService = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let MessageProducerService = class MessageProducerService {
    constructor(queue) {
        this.queue = queue;
        this.logger = new common_1.Logger('Producer Service');
    }
    async enqueueMessage(message) {
        await this.queue.add('process-message', message, {
            priority: message.priority,
            attempts: message.maxRetries,
            backoff: { type: 'exponential', delay: 1000 },
        });
        this.logger.log(`[PRODUCER] Enqueued message ID: ${message.id} with priority ${message.priority}`);
    }
};
exports.MessageProducerService = MessageProducerService;
exports.MessageProducerService = MessageProducerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)('message-queue')),
    __metadata("design:paramtypes", [bullmq_2.Queue])
], MessageProducerService);
//# sourceMappingURL=message-producer.service.js.map