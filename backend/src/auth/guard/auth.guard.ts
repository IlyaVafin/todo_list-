import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { AuthCookieRequest } from "../interfaces/auth.cookie.request.interface";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: AuthCookieRequest = context.switchToHttp().getRequest();
        try {
            await this.authService.validateTokens(request);
            return true;
        } catch {
            return false;
        }
    }
}
