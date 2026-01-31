import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

const API_ADMIN = "http://localhost:3000/api/v1/admin";

export const useAdminStore = create((set) => ({
    error: null,
    isAdminAuthenticated: false,
    loading1: false,
    admin: null,
    isCheckingAdmin: true,

    login: async (input) => {
        set({ loading1: true, error: null });
        try {
            const response = await axios.post(`${API_ADMIN}/login`, input);
            if (response.data.success) {
                set({ loading1: false, admin: response.data.admin });
                toast.success(response.data.message);
            }
            else {
                set({ loading1: false });
                toast.error(response.data.message)
            }
        } catch (error) {
            set({ error: error.response.data.message || "Error logging in", loading1: false })
            toast.error(error.response.data.message || "Error logging in")
        }
    },

    Adminlogout: async () => {
        set({ loading1: true, error: null });
        try {
            const response = await axios.get(`${API_ADMIN}/logout`);
            if (response.data.success) {
                set({ loading1: false, admin: null });
                toast.success(response.data.message)
            }
            else {
                set({ loading1: false });
                toast.error(response.data.message)
            }
        } catch (error) {
            set({ error: error.response.data.message || "Error Logging Out", loading1: false })
            toast.error(error.response.data.message || "Error Loggin Out");
        }
    },

    checkAdminAuth: async () => {
        set({ isCheckingAdmin: true, error: null })
        try {
            const response = await axios.get(`${API_ADMIN}/check-admin-auth`);
            if (response.data.success) {
                set({ admin: response.data.admin, isAdminAuthenticated: true, isCheckingAdmin: false })
            }
        } catch (error) {
            set({ error: error.response.data.message, isCheckingAdmin: false })
        }
    }
}))