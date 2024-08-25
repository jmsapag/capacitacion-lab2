import { useState } from 'react';
import axios from 'axios';
import { ToDo } from "../model";
import { getAuthHeaders } from "../utils/authUtils";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const useTasks = () => {
    const [tasks, setTasks] = useState<ToDo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchTasks = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axios.get(`${BACKEND_URL}/tasks`, getAuthHeaders());
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (task: string) => {
        try {
            const params = {
                name: task,
                completed: false
            };
            const response = await axios.post(`${BACKEND_URL}/tasks`, params, getAuthHeaders());
            setTasks(prevTasks => [...prevTasks, response.data]);
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleDone = async (id: number, token: string) => {
        setLoading(true);
        try {
            const { data: task } = await axios.get(`${BACKEND_URL}/tasks/${id}`, getAuthHeaders());
            const updatedTaskData = { name: task.name, completed: !task.completed };
            const response = await axios.put(`${BACKEND_URL}/tasks/${id}`, updatedTaskData, getAuthHeaders());
            setTasks(prevTasks => prevTasks.map(t => (t.id === id ? response.data : t)));
        } catch (error) {
            console.error('Error updating task:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, token: string) => {
        setLoading(true);
        try {
            await axios.delete(`${BACKEND_URL}/tasks/${id}`, getAuthHeaders());
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (id: number, updatedName: string, token: string) => {
        setLoading(true);
        try {
            const { data: task } = await axios.get(`${BACKEND_URL}/tasks/${id}`, getAuthHeaders());
            const updatedTaskData = { name: updatedName, completed: task.completed };
            const response = await axios.put(`${BACKEND_URL}/tasks/${id}`, updatedTaskData, getAuthHeaders());
            setTasks(prevTasks => prevTasks.map(t => (t.id === id ? response.data : t)));
        } catch (error) {
            console.error('Error updating task:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        tasks,
        setTasks,
        loading,
        fetchTasks,
        addTask,
        handleDone,
        handleDelete,
        handleEdit,
    };
};
