import { AbstractDocument } from "@app/cammon";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class Order extends AbstractDocument {
    @Prop()
    name: string

    @Prop()
    phoneNumber: string

    @Prop()
    price: number
}
export const OrderSchema = SchemaFactory.createForClass(Order);