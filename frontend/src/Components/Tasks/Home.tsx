import React, {useState, FC} from 'react';
import './Home.css';
import InputField from "./InputField";
import {ToDo} from "../../model";
import ToDoList from "./ToDoList";
import { RouteComponentProps } from "react-router-dom";

type SomeComponentProps = RouteComponentProps;


const Home: FC<SomeComponentProps> = ({ history }) => {

    const logout = () => {
        localStorage.clear();
        history.push("/login");
    };

    const [task, setTask] = useState<string>("");
    const [tasks, setTasks] = useState<ToDo[]>([]);

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if(task){
            setTasks([...tasks, {id: Date.now(), task: task, isCompleted: false}]);
            setTask("");
        }
    }

  return (
      <div className="App">
          <span className="heading">To-Do List</span>
          <InputField task={task} setTask={setTask} handleAddTask={handleAddTask}/>
          <ToDoList tasks={tasks} setTasks={setTasks}/>
          <div>
              <button type="submit" className="buttons" onClick={logout}>
                  Logout
              </button>
          </div>
      </div>
  );
}

export default Home;
