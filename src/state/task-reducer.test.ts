
import {ObjTaskType} from "../App";
import {v1} from "uuid";
import {AddTaskAC, RemoveTaskAC, TaskReducer} from "./task-reducer";



const todoListID1 = v1();
const todoListID2 = v1();

const state: ObjTaskType = {
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
}



let endState =TaskReducer(state, AddTaskAC("Redux", todoListID1) )

test("task reducer should add new task", ()=>{

    expect(endState[todoListID1].length).toBe(4)
    expect(endState[todoListID1][3].title).toBe("Redux")


})


let endState1 =TaskReducer(state, RemoveTaskAC(state[todoListID2][0].id, todoListID2) )

test("task reducer should add new task", ()=>{

    expect(endState1[todoListID2].length).toBe(2)



})