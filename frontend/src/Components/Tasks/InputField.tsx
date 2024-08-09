import React, {useRef} from 'react'
import './styles.css'

interface Props{
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    handleAddTask: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({task, setTask, handleAddTask}) => {

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form className="input-form" onSubmit={(e)=>handleAddTask(e)}>
            <input ref={inputRef} type="input" className="input" placeholder="Add a new task" value={task} onChange={(e)=>setTask(e.target.value)}/>
            <button className="input-submit" type="submit">Add</button>
        </form>
    )
}

export default InputField