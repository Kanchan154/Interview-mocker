import { create } from 'zustand'
import axios from 'axios';
import { toast } from 'react-toastify';

const API_AUTH = "http://localhost:3000/api/v1/auth";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    error: null,
    isAuthenticated: false,
    loading: false,
    user: null,
    isCheckingAuth: true,

    signup: async (input) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_AUTH}/signup`, input, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            set({ loading: false })
            if (response.data.success) {
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            set({ error: error.response.data.message || "Error Signing Up", loading: false });
            toast.error(error.response.data.message)
            throw error;
        }
    },

    login: async (input) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_AUTH}/login`, input);
            if (response.data.success) {
                set({ loading: false, user: response.data.user });
                toast.success(response.data.message);
            }
            else {
                set({ loading: false });
                toast.error(response.data.message)
            }
        } catch (error) {
            set({ error: error.response.data.message || "Error Logging In", loading: false })
            toast.error(error.response.data.message || "Error Logging In");
        }
    },

    logout: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_AUTH}/logout`);
            if (response.data.success) {
                set({ loading: false, user: null });
                toast.success(response.data.message);
            }
            else {
                set({ loading: false });
                toast.error(response.data.message)
            }
        } catch (error) {
            set({ error: error.response.data.message || "Error Logging Out", loading: false })
            toast.error(error.response.data.message || "Error Logging Out");
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_AUTH}/check-auth`);
            if(response.data.success){
                set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false })
            }
        } catch (error) {
            set({ error: error.response.data.message, isCheckingAuth: false })
        }
    },
}))

