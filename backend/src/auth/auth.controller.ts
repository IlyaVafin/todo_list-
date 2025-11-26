import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
} from "@nestjs/common";
import { type Response } from "express";
import { AuthService } from "./auth.service";
import { type AuthCookieRequest } from "./interfaces/auth.cookie.request.interface";
import { type Login } from "./interfaces/login.interface";
import { AuthGuard } from "./guard/auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @HttpCode(200)
    @Post("login")
    async login(
        @Body() body: Login,
        @Res({ passthrough: true }) response: Response,
    ) {
        const tokens = await this.authService.login(body);
        response.cookie("access_token", tokens.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000,
        });
        response.cookie("refresh_token", tokens.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return { message: "Successfully login" };
    }
    @Post("refresh")
    @HttpCode(200)
    async refresh(
        @Req() req: AuthCookieRequest,
        @Res({ passthrough: true }) response: Response,
    ) {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            throw new UnauthorizedException("Invalid token");
        }
        const newTokens =
            await this.authService.generateNewAccessToken(refreshToken);
        response.cookie("access_token", newTokens.accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
        });
        return { message: "Successfully refresh" };
    }
    @Post("logout")
    @HttpCode(204)
    logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie("access_token");
        response.clearCookie("refresh_token");
    }
    @UseGuards(AuthGuard)
    @Get("me")
    @HttpCode(200)
    me(@Req() request: AuthCookieRequest) {
        return this.authService.me(request.cookies.access_token ?? "");
    }
}
