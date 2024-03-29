import React, {ChangeEvent} from "react";
import {FilterValueType} from "./AppWithRedux";
import s from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {ObjTaskType} from "./AppWithRedux";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/task-reducer";



type PropsType = {

    id: string;
    title: string;
    currentFilter: FilterValueType;
    removeTodoList: (todoListID: string)=>void;
    editedTodolistTitle: (newTodolistTitle: string,  todoListID: string) => void
    tasksFilter:(value:FilterValueType, todoListID: string)=>void;

}


export const Todolist=(props:PropsType)=> {

    const tasks = useSelector<AppRootStateType, ObjTaskType>(state => state.tasks)

    const dispatch = useDispatch();

const onClickHandler=(value:FilterValueType)=>{
        props.tasksFilter(value, props.id)
}

const addTask = (title:string) => {

    dispatch(AddTaskAC(title,props.id))

}


const removeTodoListHandler=()=>{

        props.removeTodoList(props.id)

}

const editedTodolistTitle=(newTodolistTitle: string )=>{

 props.editedTodolistTitle(newTodolistTitle, props.id)



}


    let filteredTasks = tasks[props.id]

    if (props.currentFilter == "Active") {
        filteredTasks = tasks[props.id].filter(t => !t.isDone)

    }

    if (props.currentFilter == "Completed") {
        filteredTasks = tasks[props.id].filter(t => t.isDone)

    }



    return (

            <div>

                <h3>
                    <EditableSpan title={props.title} editedTitle={editedTodolistTitle}/>
                    <button onClick={removeTodoListHandler}>x</button></h3>

                <AddItemForm addItem={addTask}/>

                <ul>
                    {filteredTasks.map(t=>{

                        const removeTaskHandler=()=>{
                            dispatch(RemoveTaskAC(t.id, props.id))
                        }

                        const changeTaskStatusHandler=(e:ChangeEvent<HTMLInputElement>)=>{

                            dispatch(ChangeTaskStatusAC(t.id, props.id))
                        }

                        const editedTaskTitle = (newTitle:string)=> {

                           dispatch(ChangeTaskTitleAC(t.id, props.id, newTitle ))

                        }

                        return (
                            <li key={t.id} className={t.isDone?s.isDone:""}>
                                <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler} />
                                <EditableSpan title={t.title} editedTitle={editedTaskTitle}/>

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