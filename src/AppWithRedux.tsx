import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/task-reducer";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";



export type ObjTaskType = {
    [key: string]: Array<TaskType>
}

export type TaskType = {
    id: string,
    isDone: boolean,
    title: string,
}

export type TodolistType = {

    id: string,
    title: string,
    filter: FilterValueType

}


export type FilterValueType = "All" | "Active" | "Completed"


const AppWithRedux =()=> {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, ObjTaskType>(state => state.tasks)

    const dispatch = useDispatch();

    const removeTask = (id: string, todoListID: string) => {

        const action = RemoveTaskAC(id, todoListID)
        dispatch(action)

    }


    const addTask = (title: string, todoListID: string) => {

        const action = AddTaskAC(title, todoListID)
        dispatch(action)

    }


    const changeTaskStatus = (id: string, checkedStatus: boolean, todoListID: string) => {

        const action = ChangeTaskStatusAC(id, todoListID);
        dispatch(action)

    }


    const editedTaskTitle = (newTitle: string, todolistID: string, taskID: string) => {

        const action = ChangeTaskTitleAC(taskID, todolistID, newTitle)
        dispatch(action)

    }

    const tasksFilter = (value: FilterValueType, todoListID: string) => {
        const action = ChangeTodolistFilterAC(todoListID, value)
        dispatch(action)
    }


    const addTodolist = (title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action);

    }


    const editedTodolistTitle = (newTodolistTitle: string, todoListID: string) => {
        const action = ChangeTodolistTitleAC(todoListID, newTodolistTitle)
        dispatch(action);

    }

    const removeTodoList = (todoListID: string) => {
        const action = RemoveTodolistAC(todoListID)
        dispatch(action);
    }


    return (

        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Todolist
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>


                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={2}>
                    {todolists.map(tl => {


                            let filteredTasks = tasks[tl.id]

                            if (tl.filter == "Active") {
                                filteredTasks = tasks[tl.id].filter(t => !t.isDone)
                                console.log(filteredTasks)
                            }

                            if (tl.filter == "Completed") {
                                filteredTasks = tasks[tl.id].filter(t => t.isDone)
                                console.log(filteredTasks)
                            }

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "20px"}} elevation={3}>
                                    <Todolist key={tl.id}
                                              id={tl.id}
                                              tasks={filteredTasks}
                                              title={tl.title}
                                              removeTask={removeTask}
                                              addTask={addTask}
                                              tasksFilter={tasksFilter}
                                              changeTaskStatus={changeTaskStatus}
                                              currentFilter={tl.filter}
                                              removeTodoList={removeTodoList}
                                              editedTaskTitle={editedTaskTitle}
                                              editedTodolistTitle={editedTodolistTitle}
                                    />
                                </Paper>
                            </Grid>

                        }
                    )}


                </Grid>
            </Container>
        </div>

    );
}

export default AppWithRedux;