import React, {useState} from "react";
import {TaskType} from "./App";


type PropsType = {

    tasks: Array<TaskType>;
    title: string;
    removeTask: (id:string)=>void;
    addTask:(title:string)=>void;
}


export const Todolist=(props:PropsType)=> {
    const [title, setTitle] = useState("")


    return (

            <div>
                <h3>{props.title}</h3>
                <div>
                    <input onChange={(e)=> setTitle(e.currentTarget.value)}/>
                    <button onClick={()=>props.addTask(title)}>+</button>
                </div>
                <ul>
                    {props.tasks.map(t=>{
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={()=>props.removeTask(t.id)}>x</button>
                            </li>

                        )
                    })}
                </ul>
                <div>
                    <button >All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
    )

}