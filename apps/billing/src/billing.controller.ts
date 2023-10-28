import { Controller, Get } from '@nestjs/common';
import { BillingService } from './billing.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/cammon';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private rmqService: RmqService
  ) { }
  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }
  
  @EventPattern("order_created")
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.billingService.bill(data);
    this.rmqService.ack(context);
  }
}
