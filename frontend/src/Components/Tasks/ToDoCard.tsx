import React, {useEffect, useRef, useState} from 'react';
import {ToDo} from "../../model";
import {AiFillEdit} from "react-icons/ai";
import {MdDelete, MdDone} from "react-icons/md";
import './Tasks.css'
import axios from "axios";

type Props = {
    task: ToDo,
    tasks: ToDo[],
    setTasks: React.Dispatch<React.SetStateAction<ToDo[]>>
}

const ToDoCard = ({task, tasks, setTasks}: Props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<string>(task.name)


    function handleDone(id: number) {
        const token = localStorage.getItem('auth');

        // Find the task that needs to be updated
        const taskToUpdate = tasks.find((task) => task.id === id);
        if (!taskToUpdate) {
            console.error('Task not found');
            return;
        }

        // Toggle the completed status
        const updatedTaskData = {
            name: taskToUpdate.name,
            completed: !taskToUpdate.completed
        };

        // Send a PUT request to the backend to update the task
        axios.put(`http://localhost:4000/tasks/${id}`, updatedTaskData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log('Task updated:', response.data);
                // Update the tasks state with the updated task
                setTasks(tasks.map((task) => task.id === id ? response.data : task));
            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
    }

    function handleDelete(id: number) {
        const token = localStorage.getItem('auth');

        // Send a DELETE request to the backend
        axios.delete(`http://localhost:4000/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log('Task deleted:', response.data);
                // Update the tasks state by filtering out the deleted task
                setTasks(tasks.filter((task) => task.id !== id));
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    }

    function handleEdit(e: React.FormEvent<HTMLFormElement>, id: number) {
        e.preventDefault();
        const token = localStorage.getItem('auth');

        // Find the task that needs to be updated
        const taskToUpdate = tasks.find((task) => task.id === id);
        if (!taskToUpdate) {
            console.error('Task not found');
            return;
        }

        // Prepare the updated task data with the new name
        const updatedTaskData = {
            name: editTask,  // This is the new name you want to set
            completed: taskToUpdate.completed
        };

        // Send a PUT request to the backend to update the task name
        axios.put(`http://localhost:4000/tasks/${id}`, updatedTaskData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log('Task updated:', response.data);
                // Update the tasks state with the updated task
                setTasks(tasks.map((task) => task.id === id ? response.data : task));
                setEdit(false);  // Exit edit mode after updating the task
            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
    }



    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])

    return (
        <form className="cards-form" onSubmit={(e) => handleEdit(e, task.id)}>

            {
                edit ? (
                    <input ref={inputRef} value={editTask} onChange={(e) => setEditTask(e.target.value)} className="task-card"/>
                ) : (
                    task.completed ? (
                        <s className={"task-card"}>{task.name}</s>
                        ) : (
                        <span className="task-card">{task.name}</span>
                        )

                )
            }

            <div>
                <span className="card-icon" onClick= {()=>{
                    if(!edit && !task.completed){
                        setEdit(!edit);
                    }
                }}><AiFillEdit/></span>
                <span className="card-icon" onClick={()=>handleDelete(task.id)}><MdDelete/></span>
                <span className="card-icon" onClick={()=>handleDone(task.id)}><MdDone /></span>
            </div>
        </form>

    )
}

export default ToDoCard