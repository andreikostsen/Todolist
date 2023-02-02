import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

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

    const dispatch = useDispatch();


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



                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "20px"}} elevation={3}>
                                    <Todolist key={tl.id}
                                              id={tl.id}
                                              title={tl.title}
                                              currentFilter={tl.filter}
                                              removeTodoList={removeTodoList}
                                              editedTodolistTitle={editedTodolistTitle}
                                              tasksFilter={tasksFilter}


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