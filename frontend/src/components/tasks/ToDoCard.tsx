import React, { useEffect, useRef, useState } from 'react';
import { ToDo } from "../../model";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete, MdDone } from "react-icons/md";
import './Tasks.css';
import { updateTask, deleteTask } from "../../services/tasksService";

type Props = {
    task: ToDo,
    tasks: ToDo[],
    setTasks: React.Dispatch<React.SetStateAction<ToDo[]>>
}

const ToDoCard = ({ task, tasks, setTasks }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<string>(task.name);

    const handleDone = async (id: number) => {
        const token = localStorage.getItem('auth');
        if (!token) {
            console.error('No token found');
            return;
        }

        const updatedTaskData = {
            name: task.name,
            completed: !task.completed
        };

        try {
            const updatedTask = await updateTask(token, id, updatedTaskData);
            setTasks(tasks.map((task) => task.id === id ? updatedTask : task));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async (id: number) => {
        const token = localStorage.getItem('auth');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            await deleteTask(token, id);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();
        const token = localStorage.getItem('auth');
        if (!token) {
            console.error('No token found');
            return;
        }

        const updatedTaskData = {
            name: editTask,
            completed: task.completed
        };

        try {
            const updatedTask = await updateTask(token, id, updatedTaskData);
            setTasks(tasks.map((task) => task.id === id ? updatedTask : task));
            setEdit(false);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <form className="cards-form" onSubmit={(e) => handleEdit(e, task.id)}>
            {edit ? (
                <input ref={inputRef} value={editTask} onChange={(e) => setEditTask(e.target.value)} className="task-card" />
            ) : (
                task.completed ? (
                    <s className="task-card">{task.name}</s>
                ) : (
                    <span className="task-card">{task.name}</span>
                )
            )}
            <div>
                <span className="card-icon" onClick={() => {
                    if (!edit && !task.completed) {
                        setEdit(!edit);
                    }
                }}><AiFillEdit /></span>
                <span className="card-icon" onClick={() => handleDelete(task.id)}><MdDelete /></span>
                <span className="card-icon" onClick={() => handleDone(task.id)}><MdDone /></span>
            </div>
        </form>
    );
}

export default ToDoCard;