import React, {ChangeEvent,KeyboardEvent , useState} from "react";
import {FilterValueType, TaskType} from "./App";
import s from "./Todolist.module.css"



type PropsType = {

    id: string;
    tasks: Array<TaskType>;
    title: string;
    removeTask: (id:string, todoListID: string)=>void;
    addTask:(title:string, todoListID: string)=>void;
    tasksFilter:(value:FilterValueType, todoListID: string)=>void;
    changeTaskStatus: (id:string, checkedStatus: boolean, todoListID: string)=>void;
    currentFilter: FilterValueType;
    removeTodoList: (todoListID: string)=>void;

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
            props.addTask(title, props.id)
            setTitle("")
            if(title=="") {
                setError(true)
            }
        }
    }

    const addTask = () => {
        props.addTask(title, props.id)
        setTitle("")
        if(title=="") {
            setError(true)
        }
    }

const onClickHandler=(value:FilterValueType)=>{
        props.tasksFilter(value, props.id)
}


const removeTodoListHandler=()=>{

        props.removeTodoList(props.id)

}


console.log(props.currentFilter)


    return (

            <div>

                <h3>{props.title}
                    <button onClick={removeTodoListHandler}>x</button></h3>
                <div>
                    <input onChange={onChangeHandler} onKeyDown={onKeyDownHandler} value={title}/>
                    <button onClick={addTask}>+</button>
                    {error && <div className={s.error}>please enter task title</div>}
                </div>
                <ul>
                    {props.tasks.map(t=>{

                        const removeTaskHandler=()=>{
                            props.removeTask(t.id, props.id)
                        }

                        const changeTaskStatusHandler=(e:ChangeEvent<HTMLInputElement>)=>{

                            props.changeTaskStatus(t.id, e.target.checked, props.id)
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