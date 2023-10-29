import { Controller, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDTO } from './dto/item.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('items')
export class ItemsController {
    constructor(private itemService: ItemsService){}

    @UseGuards(JwtGuard)
    @Post()
   public async create(item: CreateItemDTO){
       return this.itemService.createItem(item)
    }
}