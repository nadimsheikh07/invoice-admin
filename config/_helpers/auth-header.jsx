import { getToken } from './user';
export const authHeader = () => {
    const token = getToken()

    if (token) {
        return {
            'Authorization': 'Bearer ' + token,
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With",
            // 'Content-Type': 'multipart/form-data'
        }
    } else {
        return {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With",
            // 'Content-Type': 'multipart/form-data'
        }
    }
}