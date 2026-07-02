import axios from 'axios';
import { ACTIONS } from '../context/CartReducer';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

// logut function
export function logout(navigate, dispatch, setupMessage) {
    localStorage.clear()
    setupMessage('success', `You suucessfully logged out.`, 'Log Out!')
    dispatch({ type: ACTIONS.SET_CART, payload: [] })
    navigate('/account')
}

export default api;