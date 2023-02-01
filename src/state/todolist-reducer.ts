import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

export type ActionsType = AddTodolistActionType
    | RemoveTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType


export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string,
    todolistID: string,
}


export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    newTitle: string,
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    newFilterValue: FilterValueType
}

const initialState:Array<TodolistType>  = []


export const todolistReducer = (state = initialState, action: ActionsType) => {

    switch (action.type) {

        case "ADD-TODOLIST":

        let newState = [...state]

            newState.push({id: action.todolistID, title: action.title, filter: "Active"})

            // return [...state, {id: v1(), title: "What to 3", filter: "Active"}]

            return newState

        case "REMOVE-TODOLIST":

            let newState1 = [...state]

            newState1 = newState1.filter(t=>t.id!==action.id)

            return newState1

        case "CHANGE-TODOLIST-TITLE":

            let newState2 = [...state]

            newState2 = newState2.map(t=>t.id==action.id?{id:t.id, title: action.newTitle, filter: t.filter}:t)


            return newState2


        case "CHANGE-TODOLIST-FILTER":

            let newState3 = [...state]

            newState3 = newState3.map(t=>t.id==action.id?
                {id:t.id, title: t.title, filter: action.newFilterValue}:t)


            return newState3

        default: return state


    }



}

export const AddTodolistAC=(title:string):AddTodolistActionType=>({
    type: "ADD-TODOLIST",
    title,
    todolistID: v1()
})

export const RemoveTodolistAC = (id:string):RemoveTodolistActionType=> ({

    type: "REMOVE-TODOLIST",
    id
})

export const ChangeTodolistTitleAC = (id:string, newTitle:string):ChangeTodolistTitleActionType => (
    {
        type: "CHANGE-TODOLIST-TITLE",
        id,
        newTitle,
    }
)

export const ChangeTodolistFilterAC = (id:string, newFilterValue: FilterValueType):ChangeTodolistFilterActionType => (
    {
        type: "CHANGE-TODOLIST-FILTER",
        id,
        newFilterValue,
    }
)


