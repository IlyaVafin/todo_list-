import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { UserRepository } from "src/user/repository/user.repository";
import { JwtPayload } from "./interfaces/jwt.payload.interface";
import { Login } from "./interfaces/login.interface";
import { ConfigService } from "@nestjs/config";
import { JwtRefreshPayload } from "./interfaces/jwt.refresh.payload";
import { AuthCookieRequest } from "./interfaces/auth.cookie.request.interface";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly configService: ConfigService,
    ) {}
    async login(dto: Login) {
        const { email, password } = dto;

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword) {
            throw new UnauthorizedException("Invalid credentials");
        }
        const accessTokenpayload: JwtPayload = {
            user: {
                sub: user.id,
                email: user.email,
                name: user.name,
            },
        };
        const refreshTokenPayload: JwtRefreshPayload = {
            user: {
                sub: user.id,
            },
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(accessTokenpayload, {
                expiresIn: "15m",
            }),
            this.jwtService.signAsync(refreshTokenPayload, {
                expiresIn: "7d",
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    me(access_token: string) {
        const { user } = this.jwtService.decode<JwtPayload>(access_token);
        return user;
    }
    async generateNewAccessToken(refreshToken: string) {
        try {
            const payload: JwtRefreshPayload =
                await this.jwtService.verifyAsync(refreshToken, {
                    secret: this.configService.getOrThrow<string>("JWT_SECRET"),
                });
            const user = await this.userRepository.findById(payload.user.sub);
            if (!user) {
                throw new UnauthorizedException("User not found");
            }
            const newPayload: JwtPayload = {
                user: {
                    sub: user.id,
                    email: user.email,
                    name: user.name,
                },
            };
            const newAccessToken = await this.jwtService.signAsync(newPayload);
            return {
                accessToken: newAccessToken,
            };
        } catch {
            throw new UnauthorizedException("Invalid token");
        }
    }
    async validateTokens(request: AuthCookieRequest) {
        if (!request.cookies.access_token) {
            throw new UnauthorizedException("Access token not found");
        }
        const accessTokenpayload: JwtPayload =
            await this.jwtService.verifyAsync(request.cookies.access_token, {
                secret: this.configService.getOrThrow<string>("JWT_SECRET"),
            });
        request.user = accessTokenpayload.user;
        return accessTokenpayload;
    }
}
