import {TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
}

export const todolistReducer = (state: Array<TodolistType>, action: ActionType) => {

    switch (action.type) {

        case "ADD-TODOLIST":

        let newState = [...state]

            newState.push({id: v1(), title: "What to 3", filter: "Active"})

            // return [...state, {id: v1(), title: "What to 3", filter: "Active"}]

            return newState

        case "REMOVE-"

        default: throw new Error("I don't understand this type")


    }




}