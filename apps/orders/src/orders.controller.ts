import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/create.order.request';
import { JwtAuthGuard } from '@app/cammon';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post("create-order")
  @UseGuards(JwtAuthGuard)
  createOrder(
    @Body() createOrderDto: CreateOrderRequest,
    @Req() req: any
  ) {
    return this.ordersService.createOrderRequest(createOrderDto, req.cookies?.Authentication);
  }
  @Get("get-order")
  getOrder() {
    return this.ordersService.getOrderList();
  }
  @Post("find-order")
  getOrderById(@Body() id: string) {
    return this.ordersService.findOrder(id);
  }

}
