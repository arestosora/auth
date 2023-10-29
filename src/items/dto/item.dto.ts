import { IsString } from 'class-validator'

export class CreateItemDTO {
    @IsString()
    name: string
    @IsString()
    ShopName: string
    @IsString()
    ItemCode: string
}