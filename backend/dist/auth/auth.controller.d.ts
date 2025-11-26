import { type Response } from "express";
import { AuthService } from "./auth.service";
import { type AuthCookieRequest } from "./interfaces/auth.cookie.request.interface";
import { type Login } from "./interfaces/login.interface";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: Login, response: Response): Promise<{
        message: string;
    }>;
    refresh(req: AuthCookieRequest, response: Response): Promise<{
        message: string;
    }>;
    logout(response: Response): void;
}
