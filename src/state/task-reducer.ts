import {ObjTaskType} from "../App";
import {v1} from "uuid";

//AddTask
//RemoveTask
//ChangeTaskTitle
//ChangeTaskStatus

type ActionsType = AddTaskActionType | RemoveTaskActionType

type AddTaskActionType = {
    type: "ADD-TASK",
    title: string,
    todolistID: string

}

type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    taskID: string,
    todolistID: string

}




export const TaskReducer = (state:ObjTaskType, action:ActionsType) => {

    switch (action.type) {

        case "ADD-TASK":

        let startState = {...state}

            let newTask = {id: v1(), isDone: false, title: action.title}

            startState[action.todolistID] = [...state[action.todolistID], newTask]

            return startState


        case "REMOVE-TASK":

            let startState1 = {...state}

            startState1[action.todolistID] = startState1[action.todolistID].filter(t=>t.id!==action.taskID)


            return startState1


        default: throw new Error("I don't understand this type")

    }




}


export const AddTaskAC = (title: string, todolistID: string):AddTaskActionType => (
    {
        type: "ADD-TASK",
        title,
        todolistID
    }
)
export const RemoveTaskAC = (taskID: string, todolistID: string):RemoveTaskActionType => (
    {
        type: "REMOVE-TASK",
        taskID,
        todolistID
    }
)

