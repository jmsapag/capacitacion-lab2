import React, { useState, FC, useEffect, useRef } from 'react';
import './Home.css';
import InputField from "./InputField";
import { RouteComponentProps } from "react-router-dom";
import { useTasks } from "../../hooks/useTasks";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete, MdDone } from "react-icons/md";

type HomeProps = RouteComponentProps;

const Home: FC<HomeProps> = ({ history }) => {

    const [task, setTask] = useState<string>("");
    const [editId, setEditId] = useState<number | null>(null);
    const [editTask, setEditTask] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const { tasks, fetchTasks, addTask, handleDone, handleDelete, handleEdit, loading } = useTasks();
    const token = localStorage.getItem('auth');

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        if (inputRef.current && editId !== null) {
            inputRef.current.focus();
        }
    }, [editId]);

    const goToProfile = () => {
        history.push('/profile');
    };

    const handleAddToDo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (task.trim()) {
            await addTask(task);
            setTask('');
        }
    };

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (token && editId !== null) {
            await handleEdit(editId, editTask, token);
            setEditId(null);
            setEditTask('');
        } else {
            console.error('No token found or no task selected for editing');
        }
    };

    return (
        <div className="App">
            <span className="heading">To-Do List</span>
            <nav className="navbar">
                <div className="navbar-buttons">
                    <button onClick={goToProfile} className="navbar-button">
                        Profile
                    </button>
                </div>
            </nav>
            <InputField task={task} setTask={setTask} handleAddToDo={handleAddToDo} />
            {loading ? <p>Loading...</p> :
                <div className="tasks">
                    {tasks.map(task => (
                        <form key={task.id} className="cards-form" onSubmit={handleEditSubmit}>
                            {editId === task.id ? (
                                <input
                                    ref={inputRef}
                                    value={editTask}
                                    onChange={(e) => setEditTask(e.target.value)}
                                    className="task-card"
                                />
                            ) : (
                                task.completed ? (
                                    <s className="task-card">{task.name}</s>
                                ) : (
                                    <span className="task-card">{task.name}</span>
                                )
                            )}
                            <div>
                                {editId === task.id ? (
                                    <button type="submit" className="card-icon">Save</button>
                                ) : (
                                    <>
                                        <span
                                            className="card-icon"
                                            onClick={() => {
                                                if (!task.completed) {
                                                    setEditId(task.id);
                                                    setEditTask(task.name);
                                                }
                                            }}
                                        >
                                            <AiFillEdit />
                                        </span>
                                        <span
                                            className="card-icon"
                                            onClick={() => {
                                                if (token) {
                                                    handleDelete(task.id, token);
                                                } else {
                                                    console.error('No token found');
                                                }
                                            }}
                                        >
                                            <MdDelete />
                                        </span>
                                        <span
                                            className="card-icon"
                                            onClick={() => {
                                                if (token) {
                                                    handleDone(task.id, token);
                                                } else {
                                                    console.error('No token found');
                                                }
                                            }}
                                        >
                                            <MdDone />
                                        </span>
                                    </>
                                )}
                            </div>
                        </form>
                    ))}
                </div>
            }
        </div>
    );
};

export default Home;
