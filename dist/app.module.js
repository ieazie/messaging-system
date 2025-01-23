"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const queue_config_1 = require("./queue/config/queue.config");
const message_processor_service_1 = require("./services/message-processor.service");
const message_producer_service_1 = require("./services/message-producer.service");
const message_queue_processor_1 = require("./queue/message-queue.processor");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bullmq_1.BullModule.forRoot(queue_config_1.queueConfig),
            bullmq_1.BullModule.registerQueue({
                name: 'message-queue',
            }),
        ],
        providers: [
            message_processor_service_1.MessageProcessorService,
            message_producer_service_1.MessageProducerService,
            message_queue_processor_1.MessageQueueProcessor,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map