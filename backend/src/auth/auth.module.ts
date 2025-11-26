import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserRepository } from "src/user/repository/user.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtConfigService } from "./config/jwt.config";

@Module({
    imports: [
        JwtModule.registerAsync({
            useClass: JwtConfigService,
        }),
    ],
    controllers: [AuthController],
    exports: [AuthService],
    providers: [AuthService, UserRepository],
})
export class AuthModule {}
