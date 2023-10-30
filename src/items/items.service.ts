import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDTO, UpdateItemDTO } from './dto/item.dto';
import { IProduct } from './interfaces/items.interfaces';

@Injectable()
export class ItemsService implements IProduct {

    constructor(private prismaService: PrismaService) { }

    public async searchByCategory(id: number){
        const products = await this.prismaService.product.findMany({
            where:{
                category: {
                    some: {
                        id: id
                    }
                }
            }
        })

        return products;
    }

    public async updateItem(id: string, data: UpdateItemDTO) {
        const existingProduct = await this.prismaService.product.findUnique({
          where: {
            productId: id,
          },
        });
      
        if (!existingProduct) {
          throw new NotFoundException('Product not found.');
        }
      
        const updatedProduct = await this.prismaService.product.update({
          where: {
            productId: id,
          },
          data: {
            name: data.name,
            description: data.description,
            image: data.image,
            price: data.price,
          },
        });
      
        return updatedProduct;
      }

    public async getProductbyId(id: string) {
        return await this.prismaService.product.findUnique({
            where: {
                productId: id
            }
        })
    }

    public async getAllProducts() {
        return this.prismaService.product.findMany({
            include: { category: true }
        })
    }

    public async createProduct(Product: CreateProductDTO) {
        return this.prismaService.product.create({
            data: {
                productId: Product.ProductID,
                name: Product.name,
                description: Product.description,
                image: Product.image,
                price: Product.price,
                category: {
                    connect: [{ id: Product.CategoryID }]
                },
                inventory: {
                    create: {
                        stock: Product.stock
                    }
                },
            }
        })
    }

    public async deleteProduct(productId: string) {

        const product = await this.prismaService.product.findUnique({
            where: { productId }
        })

        if (!product) {
            throw new NotFoundException('Product not found.')
        } else {
            await this.prismaService.inventory.delete({
                where: {
                    productId
                }
            })

            return this.prismaService.product.delete({
                where: {
                    productId
                }
            })
        }
    }
}
