import { type Request } from "express";
export interface AuthCookieRequest extends Request {
    cookies: {
        access_token?: string;
        refresh_token?: string;
    };
    user?: {
        sub: string;
        name: string;
        email: string;
    };
}
