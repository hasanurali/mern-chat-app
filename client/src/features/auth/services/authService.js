import { api, ENDPOINTS } from '@/shared/index'


// Register
export const register = (data) => {
    return api.post(ENDPOINTS.AUTH.REGISTER, data)
};

// Login
export const login = (data) => {
    return api.post(ENDPOINTS.AUTH.LOGIN, data)
}

// Refresh token
export const refreshToken = () => {
    return api.post(ENDPOINTS.AUTH.REFRESH)
}