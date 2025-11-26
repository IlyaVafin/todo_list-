export interface JwtPayload {
    user: {
        sub: string;
        email: string;
        name: string;
    };
}
