interface ApiResponse<T> {
    data?: T | T[];
    message?: string;
    error?: any;
}

export default <T>(params: ApiResponse<T>) => {
    return { ...params };
};