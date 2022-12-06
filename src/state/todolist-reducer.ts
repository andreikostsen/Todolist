import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionsType = AddTodolistActionType
    | RemoveTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType


type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
}
type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}

type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    newTitle: string,
}
type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    newFilterValue: FilterValueType
}




export const todolistReducer = (state: Array<TodolistType>, action: ActionsType) => {

    switch (action.type) {

        case "ADD-TODOLIST":

        let newState = [...state]

            newState.push({id: v1(), title: action.title, filter: "Active"})

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

        default: throw new Error("I don't understand this type")


    }




}