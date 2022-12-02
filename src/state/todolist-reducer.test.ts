import {todolistReducer} from "./todolist-reducer";
import {TodolistType} from "../App";
import {v1} from "uuid";


const startState: Array<TodolistType>= [
    {id: v1(), title: "What to 1", filter: "All"},
    {id: v1(), title: "What to 2", filter: "Active"}
]

const endState = todolistReducer(startState, {type: "ADD-TODOLIST"})

test("", ()=> {

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe("What to 3")

})