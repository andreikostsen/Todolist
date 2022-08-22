import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";



export type TaskType = {
    id: string,
    isDone: boolean,
    title: string,
}


function App() {

    const todolistTitle = "What to learn"


    const [state, setState] = useState<Array<TaskType>>(
        [
            {id: v1(), isDone:true, title:"HTML&CSS"},
            {id: v1(), isDone:true, title:"JS"},
            {id: v1(), isDone:false, title:"React"},

        ]
    )

    const removeTask=(id:string)=>{
        const updatedState = state.filter(t=>t.id!==id)
        setState(updatedState)
    }

    const addTask=(title:string)=> {

        const newTask = {id:v1(), isDone:false, title:title}

        setState([newTask, ...state])

    }




    return (
        <div className="App">

            <Todolist  tasks={state} title={todolistTitle} removeTask={removeTask} addTask={addTask}/>
        </div>
    );
}

export default App;
