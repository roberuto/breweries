export const isProduction = () => process.env.NODE_ENV === 'production';

export const DEBUG = !isProduction() && process.env.DEBUG === 'true';
export const apiUrl = process.env.API_URL;
