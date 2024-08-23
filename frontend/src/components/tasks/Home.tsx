import React, {useState, FC, useEffect} from 'react';
import './Home.css';
import InputField from "./InputField";
import {ToDo} from "../../model";
import ToDoList from "./ToDoList";
import { RouteComponentProps } from "react-router-dom";
import axios from "axios";

type SomeComponentProps = RouteComponentProps;


const Home: FC<SomeComponentProps> = ({ history }) => {

    const [task, setTask] = useState<string>("");
    const [tasks, setTasks] = useState<ToDo[]>([]);

    const goToProfile = () => {
        history.push('/profile');
    };

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('auth');
            const response = await axios.get('http://localhost:4000/tasks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks(); // Fetch tasks when component mounts
    }, []);


    const handleAddToDo = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('auth');
            let params = {
                name: task,
                completed: false
            }
            const response = await axios.post(
                'http://localhost:4000/tasks', params,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Task created:', response.data);
            setTask('');
            window.location.reload();
        } catch (error) {
            console.error('Error creating task:', error);
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
          <InputField task={task} setTask={setTask} handleAddToDo={handleAddToDo}/>
          <ToDoList tasks={tasks} setTasks={setTasks}/>
      </div>
  );
}

export default Home;
