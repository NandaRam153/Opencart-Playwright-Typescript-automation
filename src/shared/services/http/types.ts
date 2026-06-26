export interface CartAddResponse {
    success?: string;
    error?: Record<string, string> | string;
    redirect?: string;
    total?: string;
}
