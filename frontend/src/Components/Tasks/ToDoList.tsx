import React from 'react';
import './Tasks.css'
import {ToDo} from "../../model";
import ToDoCard from "./ToDoCard";

interface Props{
    tasks: ToDo[];
    setTasks: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const ToDoList: React.FC<Props> = ({tasks, setTasks}) => {

    return (
        <div className="tasks">
            {tasks.map(task => (
                <ToDoCard task={task} key={task.id} tasks={tasks} setTasks={setTasks}/>
            ))}
        </div>
    )
}

export default ToDoList