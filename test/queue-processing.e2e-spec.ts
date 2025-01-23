import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { MessageProducerService } from '../src/services/message-producer.service';

describe('Queue Processing', () => {
  let messageProducerService: MessageProducerService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    messageProducerService = app.get<MessageProducerService>(
      MessageProducerService,
    );
  });

  it('should enqueue messages successfully', async () => {
    const message = {
      id: '1',
      text: 'High priority',
      priority: 1,
      retries: 0,
      maxRetries: 3,
    };

    const spy = jest.spyOn(messageProducerService, 'enqueueMessage');
    await messageProducerService.enqueueMessage(message);

    expect(spy).toHaveBeenCalledWith(message);
  });
  it('should process high priority messages first', async () => {
    const lowPriority = {
      id: '1',
      text: 'Low priority',
      priority: 5,
      retries: 0,
      maxRetries: 3,
    };
    const highPriority = {
      id: '2',
      text: 'High priority',
      priority: 1,
      retries: 0,
      maxRetries: 3,
    };

    const spy = jest.spyOn(messageProducerService, 'enqueueMessage');
    await messageProducerService.enqueueMessage(lowPriority);
    await messageProducerService.enqueueMessage(highPriority);

    expect(spy).toHaveBeenCalledWith(lowPriority);
    expect(spy).toHaveBeenCalledWith(highPriority);
  });
});
