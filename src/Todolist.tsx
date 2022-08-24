import React, {ChangeEvent,KeyboardEvent , useState} from "react";
import {FilterValueType, TaskType} from "./App";
import s from "./Todolist.module.css"



type PropsType = {

    tasks: Array<TaskType>;
    title: string;
    removeTask: (id:string)=>void;
    addTask:(title:string)=>void;
    tasksFilter:(value:FilterValueType)=>void;
    changeTaskStatus: (id:string, checkedStatus: boolean)=>void;
    currentFilter: FilterValueType

}


export const Todolist=(props:PropsType)=> {
    const [title, setTitle] = useState("")

    const [error, setError] = useState<boolean>(false);




    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
        setError(false)
    }


    const onKeyDownHandler=(e:KeyboardEvent<HTMLInputElement>)=> {

        if(e.key === "Enter") {
            props.addTask(title)
            setTitle("")
            if(title=="") {
                setError(true)
            }
        }
    }

    const addTask = () => {
        props.addTask(title)
        setTitle("")
        if(title=="") {
            setError(true)
        }
    }

const onClickHandler=(value:FilterValueType)=>{
        props.tasksFilter(value)
}


console.log(props.currentFilter)


    return (

            <div>
                <h3>{props.title}</h3>
                <div>
                    <input onChange={onChangeHandler} onKeyDown={onKeyDownHandler} value={title}/>
                    <button onClick={addTask}>+</button>
                    {error && <div className={s.error}>please enter task title</div>}
                </div>
                <ul>
                    {props.tasks.map(t=>{

                        const removeTaskHandler=()=>{
                            props.removeTask(t.id)
                        }

                        const changeTaskStatusHandler=(e:ChangeEvent<HTMLInputElement>)=>{

                            props.changeTaskStatus(t.id, e.target.checked)
                            console.log(e.target.checked)


                        }



                        return (
                            <li key={t.id} className={t.isDone?s.isDone:""}>
                                <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler} />
                                <span>{t.title}</span>
                                <button onClick={removeTaskHandler}>x</button>
                            </li>

                        )
                    })}
                </ul>
                <div>
                    <button onClick={()=>onClickHandler("All")} className={props.currentFilter === "All" ? s.activeFilter: ""}>All</button>
                    <button onClick={()=>onClickHandler("Active")} className={props.currentFilter === "Active" ? s.activeFilter: ""}>Active</button>
                    <button onClick={()=>onClickHandler("Completed")} className={props.currentFilter === "Completed" ? s.activeFilter: ""}>Completed</button>
                </div>
            </div>
    )

}