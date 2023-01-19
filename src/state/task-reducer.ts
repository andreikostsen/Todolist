import {ObjTaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";

type ActionsType = AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | TasksForNewTodolistActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

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

type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE",
    taskID: string,
    todolistID: string,
    newTitle: string,
}

type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS",
    taskID: string,
    todolistID: string,

}

type TasksForNewTodolistActionType = {
    type: "TASKS-FOR-NEW-TODOLIST",
    todolistID: string,

}




export const taskReducer = (state:ObjTaskType, action:ActionsType) => {

    switch (action.type) {

        case "ADD-TASK":

        let startState = {...state}

            let newTask = {id: v1(), isDone: false, title: action.title}

            startState[action.todolistID] = [ newTask, ...state[action.todolistID]]

            return startState


        case "REMOVE-TASK":

            let startState1 = {...state}

            startState1[action.todolistID] = startState1[action.todolistID].filter(t=>t.id!==action.taskID)


            return startState1



        case "CHANGE-TASK-TITLE":


            let initialState1 = {...state}

           initialState1[action.todolistID] =  initialState1[action.todolistID].map(t=>t.id==action.taskID?
                {id: t.id, isDone: t.isDone, title: action.newTitle }: t)

            return initialState1


        case "CHANGE-TASK-STATUS":

            let initialState2 = {...state}

            initialState2[action.todolistID] = initialState2[action.todolistID].map(t=>t.id==action.taskID?
                {id:t.id, isDone:!t.isDone, title:t.title}:t
            )


            return initialState2

        case "ADD-TODOLIST":

            let initialState3 = {...state}

            initialState3[action.todolistID]=[]

            return initialState3


        case "REMOVE-TODOLIST":

            let initialState4 = {...state}

            delete(initialState4[action.id])

            return initialState4


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

export const ChangeTaskTitleAC = (taskID: string, todolistID:string, newTitle:string):ChangeTaskTitleActionType => (
    {
        type: "CHANGE-TASK-TITLE",
        taskID,
        todolistID,
        newTitle
    }
)

export const ChangeTaskStatusAC = (taskID: string, todolistID: string,):ChangeTaskStatusActionType => (
    {
        type: "CHANGE-TASK-STATUS",
        taskID,
        todolistID,
    }
)

// export const TasksForNewTodolistAC = (todolistID: string):TasksForNewTodolistActionType => (
// {
//     type: "TASKS-FOR-NEW-TODOLIST",
//     todolistID,
//
// }
// )
