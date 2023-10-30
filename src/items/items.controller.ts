import { Body, Controller, Post, Delete, Param, Get, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateProductDTO, UpdateItemDTO } from './dto/item.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';


@Controller('product')
export class ItemsController {
    constructor(private itemService: ItemsService) { }

    @UseGuards(JwtGuard)
    @Post('create')
    public async create(@Body() product: CreateProductDTO) {
        return this.itemService.createProduct(product)
    }

    @UseGuards(JwtGuard)
    @Delete('delete/:id')
    public async delete(@Param('id') id: string) {
        return this.itemService.deleteProduct(id);
    }
    @UseGuards(JwtGuard)
    @Get('all')
    public async findAll() {
        return this.itemService.getAllProducts();
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    public async findbyId(@Param('id') id: string) {
        return this.itemService.getProductbyId(id)
    }

    @UseGuards(JwtGuard)
    @Put('update/:id')
    public async update(@Param('id') id: string, @Body() data: UpdateItemDTO) {
        return this.itemService.updateItem(id, data);
    }

    @UseGuards(JwtGuard)
    @Get('category/:id')
    public async findByCategory(@Param('id') id: number) {
        return this.itemService.searchByCategory(id)
    }
}