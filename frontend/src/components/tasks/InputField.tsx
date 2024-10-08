import React, {useRef} from 'react'
import './Tasks.css'

interface Props{
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    handleAddToDo: (e: React.FormEvent) => Promise<void>;
}

const InputField: React.FC<Props> = ({task, setTask, handleAddToDo}) => {

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form className="input-form" onSubmit={(e)=>handleAddToDo(e)}>
            <input ref={inputRef} type="input" className="input" placeholder="Add a new task" value={task} onChange={(e)=>setTask(e.target.value)}/>
            <button className="input-submit" type="submit">Add</button>
        </form>
    )
}

export default InputField