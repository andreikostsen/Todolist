import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./todolist-reducer";
import {TodolistType} from "../App";
import {v1} from "uuid";


const startState: Array<TodolistType>= [
    {id: v1(), title: "What to 1", filter: "All"},
    {id: v1(), title: "What to 2", filter: "Active"}
]




const endState = todolistReducer(startState, AddTodolistAC("What to 3"))

test("todolist reducer should add todolist", ()=> {

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe("What to 3")

})

const endState1 = todolistReducer(startState,RemoveTodolistAC(startState[1].id))

test("todolist reducer should remove todolist", ()=>{

    expect(endState1.length).toBe(1)
    expect(endState1[0].title).toBe("What to 1")
})


const endState2 = todolistReducer(startState, ChangeTodolistTitleAC(startState[0].id, "Changed Title"))

test("todolist reducer should change todolist title", ()=>{

    expect(endState2[0].title).toBe("Changed Title")
    expect(endState2[1].title).toBe("What to 2")


})



let endState3 = todolistReducer(startState, ChangeTodolistFilterAC(startState[0].id, "Completed"))

test("Change Todolist Filter Type", ()=>{

    expect(endState3[0].filter).toBe("Completed")
    expect(endState3[1].filter).toBe("Active")
    expect(endState3.length).toBe(2)

})















