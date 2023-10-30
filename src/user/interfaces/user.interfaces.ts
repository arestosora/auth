import { CreateUserDto } from "../dto/user.dto";

export interface IUser {
    create(dto: CreateUserDto): Promise<any>;
    findByEmail(email:string): Promise<any>;
    findById(id:number): Promise<any>;
}