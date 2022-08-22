import React, {ChangeEvent,KeyboardEvent , useState} from "react";
import {FilterValueType, TaskType} from "./App";


type PropsType = {

    tasks: Array<TaskType>;
    title: string;
    removeTask: (id:string)=>void;
    addTask:(title:string)=>void;
    tasksFilter:(value:FilterValueType)=>void;
    changeTaskStatus: (id:string)=>void;
}


export const Todolist=(props:PropsType)=> {
    const [title, setTitle] = useState("")


    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }


    const onKeyDownHandler=(e:KeyboardEvent<HTMLInputElement>)=> {

        if(e.key === "Enter") {
            props.addTask(title)

        }
    }

    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }


const onClickHandler=(value:FilterValueType)=>{

        props.tasksFilter(value)

}






    return (

            <div>
                <h3>{props.title}</h3>
                <div>
                    <input onChange={onChangeHandler} onKeyDown={onKeyDownHandler} value={title}/>
                    <button onClick={addTask}>+</button>
                </div>
                <ul>
                    {props.tasks.map(t=>{

                        const removeTaskHandler=()=>{
                            props.removeTask(t.id)
                        }

                        const changeTaskStatusHandler=()=>{

                            props.changeTaskStatus(t.id)

                        }



                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler} />
                                <span>{t.title}</span>
                                <button onClick={removeTaskHandler}>x</button>
                            </li>

                        )
                    })}
                </ul>
                <div>
                    <button onClick={()=>onClickHandler("All")}>All</button>
                    <button onClick={()=>onClickHandler("Active")}>Active</button>
                    <button onClick={()=>onClickHandler("Completed")}>Completed</button>
                </div>
            </div>
    )

}