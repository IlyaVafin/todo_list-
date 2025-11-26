"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const user_repository_1 = require("../user/repository/user.repository");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    jwtService;
    userRepository;
    configService;
    constructor(jwtService, userRepository, configService) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.configService = configService;
    }
    async login(dto) {
        const { email, password } = dto;
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const isValidPassword = await (0, bcrypt_1.compare)(password, user.password);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const accessTokenpayload = {
            user: {
                sub: user.id,
                email: user.email,
                name: user.name,
            },
        };
        const refreshTokenPayload = {
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
    async generateNewAccessToken(refreshToken) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.getOrThrow("JWT_SECRET"),
            });
            const user = await this.userRepository.findById(payload.user.sub);
            if (!user) {
                throw new common_1.UnauthorizedException("User not found");
            }
            const newPayload = {
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
        }
        catch {
            throw new common_1.UnauthorizedException("Invalid token");
        }
    }
    async validateTokens(request) {
        if (!request.cookies.access_token) {
            throw new common_1.UnauthorizedException("Access token not found");
        }
        const accessTokenpayload = await this.jwtService.verifyAsync(request.cookies.access_token, {
            secret: this.configService.getOrThrow("JWT_SECRET"),
        });
        request.user = accessTokenpayload.user;
        return accessTokenpayload;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_repository_1.UserRepository,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map