import { LoginUserDto } from "../dto/auth.dto";

export interface IAuth {
    refreshToken(user: any): Promise<any>
    login(dto: LoginUserDto): Promise<any>
}