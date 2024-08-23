import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Get Tasks Service
export const getTasks = async (token: string) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks", error);
        throw error;
    }
};

// Create Task Service
export const createTask = async (token: string, task: string) => {
    try {
        const params = {
            name: task,
            completed: false
        };
        const response = await axios.post(`${BACKEND_URL}/tasks`, params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating task", error);
        throw error;
    }
};

// Update Task Service
export const updateTask = async (token: string, id: number, updatedTaskData: { name: string, completed: boolean }) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/tasks/${id}`, updatedTaskData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating task", error);
        throw error;
    }
};

// Delete Task Service
export const deleteTask = async (token: string, id: number) => {
    try {
        const response = await axios.delete(`${BACKEND_URL}/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting task", error);
        throw error;
    }
};