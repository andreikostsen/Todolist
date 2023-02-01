import {taskReducer} from "./task-reducer";
import {todolistReducer} from "./todolist-reducer";
import {combineReducers, createStore} from "redux";
import { configureStore } from '@reduxjs/toolkit'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers(
    {
        tasks: taskReducer,
        todolists: todolistReducer
    }
)

// непосредственно создаём store
const store = configureStore({
        reducer: rootReducer,
    })

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
    window.store = store

export default  store;