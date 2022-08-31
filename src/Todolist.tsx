import React, {ChangeEvent,KeyboardEvent , useState} from "react";
import {FilterValueType, TaskType} from "./App";
import s from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';



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
    editedTodolistTitle: (newTodolistTitle: string,  todoListID: string) => void
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

const editedTodolistTitle=(newTodolistTitle: string )=>{

 props.editedTodolistTitle(newTodolistTitle, props.id)



}




    return (

            <div>

                <h3>
                    <EditableSpan title={props.title} editedTitle={editedTodolistTitle}/>
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
                                <EditableSpan title={t.title} editedTitle={editedTaskTitle}/>
                                {/*<button onClick={removeTaskHandler}>x</button>*/}
                                <IconButton aria-label="delete" onClick={removeTaskHandler}>
                                    <DeleteIcon />
                                </IconButton>
                            </li>

                        )
                    })}
                </ul>
                <div>
                    <Button onClick={()=>onClickHandler("All")} variant={props.currentFilter === "All" ? "contained": "outlined"}>All</Button>
                    <Button onClick={()=>onClickHandler("Active")} variant={props.currentFilter === "Active" ? "contained": "outlined"}>Active</Button>
                    <Button onClick={()=>onClickHandler("Completed")} variant={props.currentFilter === "Completed" ? "contained": "outlined"}>Completed</Button>
                </div>
            </div>
    )

}