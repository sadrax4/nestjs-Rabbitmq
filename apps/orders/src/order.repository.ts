import { AbstractRepository } from "@app/cammon";
import { Order } from "./schema/order.schema";
import { Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

export  class OrderRepository extends AbstractRepository<Order>{
    protected readonly logger = new Logger(OrderRepository.name)
    constructor(
        @InjectModel(Order.name) OrderModel: Model<Order>,
        @InjectConnection() connection: Connection
    ) {
        super(
            OrderModel,
            connection
        )
    }
}