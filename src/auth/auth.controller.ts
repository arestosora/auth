/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService, private authService: AuthService){}

    @Post('register')
    public async registerUser(@Body()dto:CreateUserDto){
        return this.userService.create(dto);
    }

    @Post('login')
    public async login(@Body() dto: LoginUserDto){
        return await this.authService.login(dto)
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    public async refreshToken(@Request() req){
        return await this.authService.refreshToken(req.user)
    }
}
