import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/user/repository/user.repository";
import { JwtPayload } from "./interfaces/jwt.payload.interface";
import { Login } from "./interfaces/login.interface";
import { ConfigService } from "@nestjs/config";
import { AuthCookieRequest } from "./interfaces/auth.cookie.request.interface";
export declare class AuthService {
    private readonly jwtService;
    private readonly userRepository;
    private readonly configService;
    constructor(jwtService: JwtService, userRepository: UserRepository, configService: ConfigService);
    login(dto: Login): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateNewAccessToken(refreshToken: string): Promise<{
        accessToken: string;
    }>;
    validateTokens(request: AuthCookieRequest): Promise<JwtPayload>;
}
