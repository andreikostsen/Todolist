import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";



export type TaskType = {
    id: string,
    isDone: boolean,
    title: string,
}

export type FilterValueType =  "All" | "Active" | "Completed"


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
          const newTask = {id:v1(), isDone:false, title:title.trim()}
          if(title!=="") {
              setState([newTask, ...state])
          }
        }


    const changeTaskStatus=(id:string, checkedStatus: boolean)=> {


        //  MAP
        // console.log(id)
        //
        // const stateCopy = [...state]
        //
        // const updatedState = stateCopy.map(t=>t.id==id?{id: t.id, isDone: !t.isDone, title: t.title}:t)
        //
        // setState(updatedState)



        //FIND

        let foundedTask = state.find(t=>t.id==id)

        if (foundedTask) {

            foundedTask.isDone = checkedStatus

            console.log(foundedTask)

            setState([...state])

        }
    }


    const [filterName, setFilter] = useState<FilterValueType> ("All")

    let filteredState = [...state]

   if (filterName == "Active") {
        filteredState = [...state.filter(t => !t.isDone)]
        console.log(filteredState)
    }

    if (filterName == "Completed") {
        filteredState = [...state.filter(t => t.isDone)]
        console.log(filteredState)
    }

    const tasksFilter = (value: FilterValueType) => {
        console.log(value)
        setFilter(value)
        }

    return (
        <div className="App">
            <Todolist  tasks={filteredState} title={todolistTitle} removeTask={removeTask} addTask={addTask} tasksFilter={tasksFilter} changeTaskStatus={changeTaskStatus} currentFilter={filterName}/>
        </div>
    );
}

export default App;
