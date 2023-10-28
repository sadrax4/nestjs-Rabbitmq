import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { BILLING_SERVICE } from './constant';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderRequest } from './dto/create.order.request';
import { lastValueFrom } from 'rxjs';
import { Order } from './schema/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy
  ) { }
  async createOrderRequest(createOrderDto: CreateOrderRequest, authentication: string): Promise<Order> {
    const session = await this.orderRepository.startTransaction();
    try {
      const order = await this.orderRepository.create(createOrderDto, { session });
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          createOrderDto,
          Authentication: authentication
        }),
      );
      await session.commitTransaction();
      return order;
    } catch (err) {
      console.log(err);
      await session.abortTransaction();
      throw err;
    }
  }
  getOrderList(): Promise<Order[]> {
    const orders = this.orderRepository.find({});
    return orders;
  }
  findOrder(orderId: string): Promise<Order> {
    const order = this.orderRepository.findOne({ _id: orderId });
    return order;
  }
}
