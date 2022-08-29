import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type ObjTaskType = {
    [key:string]: Array<TaskType>
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


export type FilterValueType =  "All" | "Active" | "Completed"


function App() {


   const todoListID1 = v1();
   const todoListID2 = v1();


    const [state, setState] = useState<ObjTaskType>({
        [todoListID1]: [
            {id: v1(), isDone: true, title: "HTML&CSS"},
            {id: v1(), isDone: true, title: "JS"},
            {id: v1(), isDone: false, title: "React"},
        ],
        [todoListID2]: [
            {id: v1(), isDone: true, title: "HTML&CSS"},
            {id: v1(), isDone: true, title: "JS"},
            {id: v1(), isDone: false, title: "React"},
        ]
    })


    const [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {id: todoListID1, title: "What to 1", filter: "All"},
            {id: todoListID2, title: "What to 2", filter: "Active"}
        ]
    )

    const removeTask=(id:string, todoListID: string)=>{
        state[todoListID] = state[todoListID].filter(t=>t.id!==id)
        setState({...state})
    }
    const addTask=(title:string, todoListID: string)=> {
          const newTask = {id:v1(), isDone:false, title:title.trim()}

        state[todoListID] = [newTask, ...state[todoListID]]

          if(title!=="") {
              setState({...state})
          }
        }
    const changeTaskStatus=(id:string, checkedStatus: boolean, todoListID: string)=> {


        //  MAP
        // console.log(id)
        //
        // const stateCopy = [...state]
        //
        // const updatedState = stateCopy.map(t=>t.id==id?{id: t.id, isDone: !t.isDone, title: t.title}:t)
        //
        // setState(updatedState)



        //FIND

        let foundedTask = state[todoListID].find(t=>t.id==id)

        if (foundedTask) {

            foundedTask.isDone = checkedStatus

            console.log(foundedTask)

            setState({...state})

        }
    }


    const editedTaskTitle=(newTitle: string, todolistID: string, taskID: string)=>{

        console.log("New title " + newTitle + " todolistID " +  todolistID + " taskID " + taskID)


        const updatedTask = state[todolistID].find(t=>t.id==taskID)
        console.log(updatedTask)

        if (updatedTask) {
            updatedTask.title = newTitle
            setState({...state})
        }

    }



    const tasksFilter = (value: FilterValueType, todoListID: string) => {
        console.log(value + todoListID)

        let todoList = todolists.find(tl=>tl.id == todoListID)

        if (todoList) {
            todoList.filter = value
            setTodolists([...todolists])
        }

        }

        const removeTodoList=(todoListID: string)=>{

        const updatedTodolists = todolists.filter(t=>t.id!==todoListID)
            setTodolists([...updatedTodolists])

        }

    const addTodolist = (title: string) => {

        let newTodolistID = v1();
        let newTodolist:TodolistType = {id: newTodolistID, title: title, filter: "All"}
        setTodolists([newTodolist, ...todolists])
        setState({...state, [newTodolistID]: []})

    }



    return (


        <div className="App">



<AddItemForm addItem={addTodolist} />

            {todolists.map(tl => {


                let filteredTasks = state[tl.id]

                if (tl.filter == "Active") {
                    filteredTasks = state[tl.id].filter(t => !t.isDone)
                    console.log(filteredTasks)
                }

                if (tl.filter == "Completed") {
                    filteredTasks = state[tl.id].filter(t => t.isDone)
                    console.log(filteredTasks)
                }

                    return <Todolist key={tl.id}
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
                    />
                }
            )}



        </div>
    );
}

export default App;
