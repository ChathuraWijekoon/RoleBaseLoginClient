export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
    role?: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface TokenResponse {
    access_token: string;
    token_type: string;
}