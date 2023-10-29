import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateItemDTO } from './dto/item.dto';

@Injectable()
export class ItemsService {

    constructor(private prismaService: PrismaService) { }

    public async createItem(Item: CreateItemDTO) {
        const newItem = this.prismaService.item.create({
            data: {
                name: Item.name,
                ItemCode: Item.ItemCode,
                ShopName: Item.ShopName
            }
        })
        return newItem;
    }
}
