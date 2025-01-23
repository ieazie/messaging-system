"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageProcessorService = void 0;
const common_1 = require("@nestjs/common");
let MessageProcessorService = class MessageProcessorService {
    constructor() {
        this.logger = new common_1.Logger('Messaging Service');
    }
    async processMessage(message) {
        this.logger.log(`[PROCESSOR] Start processing message ID: ${message.id}`);
        if (Math.random() < 0.3) {
            throw new Error('Simulated failure for message ID: ' + message.id);
        }
        this.logger.log(`[PROCESSOR] Message ID: ${message.id} processed successfully`);
    }
};
exports.MessageProcessorService = MessageProcessorService;
exports.MessageProcessorService = MessageProcessorService = __decorate([
    (0, common_1.Injectable)()
], MessageProcessorService);
//# sourceMappingURL=message-processor.service.js.map