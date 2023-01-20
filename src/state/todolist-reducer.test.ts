import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./todolist-reducer";
import {TodolistType} from "../App";
import {v1} from "uuid";

let todoListID1: string
let todoListID2: string
let startState: Array<TodolistType>

beforeEach(()=>{
    todoListID1 =  v1()
    todoListID2 =  v1()
    startState = [
        {id: todoListID1, title: "What to 1", filter: "All"},
        {id: todoListID2, title: "What to 2", filter: "Active"}
    ]
})


test("todolist reducer should add todolist", ()=> {

    const endState = todolistReducer(startState, AddTodolistAC("What to 3"))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe("What to 3")

})


test("todolist reducer should remove todolist", ()=>{

    const endState1 = todolistReducer(startState,RemoveTodolistAC(startState[1].id))
    expect(endState1.length).toBe(1)
    expect(endState1[0].title).toBe("What to 1")
})

test("todolist reducer should change todolist title", ()=>{

    const endState2 = todolistReducer(startState, ChangeTodolistTitleAC(startState[0].id, "Changed Title"))
    expect(endState2[0].title).toBe("Changed Title")
    expect(endState2[1].title).toBe("What to 2")


})



test("Change Todolist Filter Type", ()=>{

    let endState3 = todolistReducer(startState, ChangeTodolistFilterAC(startState[0].id, "Completed"))
    expect(endState3[0].filter).toBe("Completed")
    expect(endState3[1].filter).toBe("Active")
    expect(endState3.length).toBe(2)

})















