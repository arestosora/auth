import { CreateProductDTO } from "../dto/item.dto";

export interface IProduct {
    getAllProducts(): Promise<any[]>;
    createProduct(product: CreateProductDTO): Promise<any>;
    deleteProduct(productId: string): Promise<any>;
}