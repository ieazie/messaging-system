"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const message_producer_service_1 = require("./services/message-producer.service");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Main');
    const messageProducerService = app.get(message_producer_service_1.MessageProducerService);
    const messages = [
        {
            id: '1',
            text: 'High priority',
            priority: 1,
            retries: 0,
            maxRetries: 3,
        },
        {
            id: '2',
            text: 'Low priority',
            priority: 5,
            retries: 0,
            maxRetries: 3,
        },
        {
            id: '3',
            text: 'Medium priority',
            priority: 3,
            retries: 0,
            maxRetries: 3,
        },
    ];
    for (const message of messages) {
        await messageProducerService.enqueueMessage(message);
    }
    logger.log('Message processing system running...');
    await app.listen(process.env.PORT ?? 3700);
}
bootstrap();
//# sourceMappingURL=main.js.map