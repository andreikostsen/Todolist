
import {ObjTaskType} from "../App";
import {v1} from "uuid";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    taskReducer,
    TasksForNewTodolistAC
} from "./task-reducer";




const todoListID1 = v1();
const todoListID2 = v1();

const state: ObjTaskType = {
    [todoListID1]: [
        {id: "1", isDone: true, title: "HTML&CSS"},
        {id: "2", isDone: true, title: "JS"},
        {id: "3", isDone: false, title: "React"},
    ],
    [todoListID2]: [
        {id: "1", isDone: true, title: "HTML&CSS"},
        {id: "2", isDone: true, title: "JS"},
        {id: "3", isDone: false, title: "React"},
    ]
}



let endState =taskReducer(state, AddTaskAC("Redux", todoListID1) )

test("correct task should be added to correct array", ()=>{

    expect(endState[todoListID1].length).toBe(4)
    expect(endState[todoListID1][0].title).toBe("Redux")
    expect(endState[todoListID1][0].id).toBeDefined()
    expect(endState[todoListID1][0].isDone).toBe(false)
    expect(endState[todoListID2]).toEqual([
        {id: "1", isDone: true, title: "HTML&CSS"},
        {id: "2", isDone: true, title: "JS"},
        {id: "3", isDone: false, title: "React"},
    ])



})


let endState1 =taskReducer(state, RemoveTaskAC(state[todoListID2][0].id, todoListID2) )

test("task reducer should delete task", ()=>{

    expect(endState1[todoListID2].length).toBe(2)
    expect(endState1).toEqual(
        {
            [todoListID1]: [
                {id: "1", isDone: true, title: "HTML&CSS"},
                {id: "2", isDone: true, title: "JS"},
                {id: "3", isDone: false, title: "React"},
            ],
            [todoListID2]: [
                {id: "2", isDone: true, title: "JS"},
                {id: "3", isDone: false, title: "React"},
            ]
        }

    )



})


let endState2 = taskReducer(state, ChangeTaskTitleAC(state[todoListID2][0].id, todoListID2, "HTML&CSS&SASS") )

test("task reducer should change task title", ()=>{

    expect(endState2[todoListID2][0].title).toBe("HTML&CSS&SASS")

})

let endState3 = taskReducer(state, ChangeTaskStatusAC(state[todoListID2][2].id, todoListID2))

test("task reducer should change task title", ()=>{

    expect(endState3[todoListID2][2].isDone).toBe(true)

})


test('new array should be added when new todolist is added', () => {
    const startState: ObjTaskType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = TasksForNewTodolistAC('new todolist')

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
