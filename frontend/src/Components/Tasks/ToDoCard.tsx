import React, {useEffect, useRef, useState} from 'react';
import {ToDo} from "../../model";
import {AiFillEdit} from "react-icons/ai";
import {MdDelete, MdDone} from "react-icons/md";
import './styles.css'

type Props = {
    task: ToDo,
    tasks: ToDo[],
    setTasks: React.Dispatch<React.SetStateAction<ToDo[]>>
}

const ToDoCard = ({task, tasks, setTasks}: Props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<string>(task.task)

    function handleDone(id: number) {
        setTasks(tasks.map((task) => task.id===id?{...task, isCompleted: !task.isCompleted}:task))
    }

    function handleDelete(id: number) {
        setTasks(tasks.filter((task) => task.id!==id))
    }

    function handleEdit(e: React.FormEvent<HTMLFormElement>, id: number) {
        e.preventDefault();
        setTasks(tasks.map((task) => (
            task.id===id?{...task, task: editTask}: task
        )));
        setEdit(false);
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
                    task.isCompleted ? (
                        <s className={"task-card"}>{task.task}</s>
                        ) : (
                        <span className="task-card">{task.task}</span>
                        )

                )
            }

            <div>
                <span className="card-icon" onClick= {()=>{
                    if(!edit && !task.isCompleted){
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