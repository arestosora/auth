/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IAuth } from './interfaces/auth.interfaces';

@Injectable()
export class AuthService implements IAuth {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    public async login(dto: LoginUserDto) {
        const user = await this.validateUser(dto);
        const payload = {
            username: user.email,
            sub: {
                name: user.name
            }
        }

        return {
            user, backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '1h',
                    secret: process.env.JwtSecretKey,
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.JwtRefreshTokenKey
                })
            }
        }
    }

    public async refreshToken(user: any) {
        const payload = {
            username: user.username,
            sub: user.sub
        }

        return {
            user, backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '1h',
                    secret: process.env.JwtSecretKey,
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.JwtRefreshTokenKey
                })
            }
        }
    }

    private async validateUser(dto: LoginUserDto) {
        const user = await this.userService.findByEmail(dto.email);

        if (user && (await compare(dto.password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException();
    }
}