import {ObjTaskType, TodolistType} from "../App";
import {AddTodolistAC, RemoveTodolistAC, todolistReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";

test('ids should be equals', () => {
    const startTasksState: ObjTaskType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = AddTodolistAC('new todolist')

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistID)
    expect(idFromTodolists).toBe(action.todolistID)
})



test('property with todolistId should be deleted', () => {
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

    const action = RemoveTodolistAC('todolistId2')

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
