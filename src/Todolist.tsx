import React, {ChangeEvent,KeyboardEvent , useState} from "react";
import {FilterValueType, TaskType} from "./App";
import s from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";



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
    editedTaskTitle: (title:string, todoListID: string, taskID: string) => void

}


export const Todolist=(props:PropsType)=> {

const onClickHandler=(value:FilterValueType)=>{
        props.tasksFilter(value, props.id)
}

const addTask = (title:string) => {
    props.addTask(title, props.id)
}


const removeTodoListHandler=()=>{

        props.removeTodoList(props.id)

}




    return (

            <div>

                <h3>{props.title}
                    <button onClick={removeTodoListHandler}>x</button></h3>

                <AddItemForm addItem={addTask}/>

                <ul>
                    {props.tasks.map(t=>{

                        const removeTaskHandler=()=>{
                            props.removeTask(t.id, props.id)
                        }

                        const changeTaskStatusHandler=(e:ChangeEvent<HTMLInputElement>)=>{

                            props.changeTaskStatus(t.id, e.target.checked, props.id)
                            console.log(e.target.checked)


                        }

                        const editedTaskTitle = (newTitle:string)=> {

                            props.editedTaskTitle(newTitle, props.id, t.id )

                        }

                        return (
                            <li key={t.id} className={t.isDone?s.isDone:""}>
                                <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler} />
                                <EditableSpan title={t.title} editedTaskTitle={editedTaskTitle}/>
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