import { IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateOrderRequest {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsPhoneNumber("IR")
    phoneNumber: string;
}