import {todolistReducer} from "./todolist-reducer";
import {TodolistType} from "../App";
import {v1} from "uuid";


const startState: Array<TodolistType>= [
    {id: v1(), title: "What to 1", filter: "All"},
    {id: v1(), title: "What to 2", filter: "Active"}
]

const endState = todolistReducer(startState,
    {type: "ADD-TODOLIST", title: "What to 3"})

test("todolist reducer should add todolist", ()=> {

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe("What to 3")

})

const endState1 = todolistReducer(startState,
    {type: "REMOVE-TODOLIST", id: startState[1].id})

test("todolist reducer should remove todolist", ()=>{

    expect(endState1.length).toBe(1)
    expect(endState1[0].title).toBe("What to 1")
})


const endState2 = todolistReducer(startState,
    {type: "CHANGE-TODOLIST-TITLE", id: startState[0].id, newTitle: "Changed Title" })

test("todolist reducer should change todolist title", ()=>{

    expect(endState2[0].title).toBe("Changed Title")


})


let endState3 = todolistReducer(startState,
    {type: "CHANGE-TODOLIST-FILTER", id: startState[1].id, newFilterValue: "All"})

test("todolist reducer should change todolist filter", ()=>{

    expect(endState3[1].filter).toBe("All")
    expect(endState3[0].filter).toBe("All")



})