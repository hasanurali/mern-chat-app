import { api, ENDPOINTS } from '@/shared/index'


// Register
export const register = (data) => {
    return api.post(ENDPOINTS.AUTH.REGISTER, data)
};