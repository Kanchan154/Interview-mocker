import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

const QUESTION_API = 'http://localhost:3000/api/v1/question';

export const useQuestionStore = create((set) => ({
    error: null,
    questions: [],
    loading: false,
    checkingQuestions: false,
    count: 0,

    // post questions
    setQuestions: async (input) => {
        set({ error: null, loading: true })
        try {
            const response = await axios.post(`${QUESTION_API}/post`, input);
            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false })
            }
            else {
                toast.error(response.data.message)
            }
            set({ loading: false })
        } catch (error) {
            toast.error(error.response.data.message)
            set({ error: error.response.data.message })
        }
        finally {
            set({ loading: false })
        }
    },


    // get questions for admin
    getAllQuestions: async () => {
        set({ error: null, checkingQuestions: true })
        try {
            const response = await axios.get(`${QUESTION_API}/getAllQuestions`);
            if (response.data.success) {
                set({ questions: response.data.questions, checkingQuestions: false, count: response.data.count })
            }
            else {
                set({ error: response.data.message, questions: [] })
            }
        } catch (error) {
            set({ error: "Error Getting Questions. Please refresh" });
        }
        finally {
            set({ checkingQuestions: false })
        }
    },

    // get questions for students
    getQuestionsForStudent: async () => {
        set({ loading: true, error: null })
        try {
            const response = await axios.get(`${QUESTION_API}/getQuestionforStudents`);
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, error: null })
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally {
            set({ loading: false })
        }
    },
    // delete question by Id
    deleteQuestion: async (id) => {
        set({ loading: true, error: null })
        try {
            const response = await axios.get(`${QUESTION_API}/${id}/delete`);
            if (response.data.success) {
                toast(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
            set({ loading: false, error: null })
        } catch (error) {
            toast.error(error.response.data, message)
            set({ error: null, loading: false })
        }
    }
}));
