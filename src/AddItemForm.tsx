import s from "./Todolist.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

export type PropsType = {

    addItem:(title:string)=>void;
}


export const AddItemForm = (props:PropsType) => {

    const [title, setTitle] = useState("")

    const [error, setError] = useState<boolean>(false);

    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Enter") {
            if (title == "") {
                setError(true)
            } else {
              addItem()
            }
        }
    }

    const addItem = () => {
        if (title == "") {
            setError(true)
        } else {
            props.addItem(title)
            setTitle("")
        }
    }

    return     <div>
        <TextField id="filled-basic" label="please enter the title" variant="filled" onChange={onChangeHandler} onKeyDown={onKeyDownHandler} value={title}/>
        <Button variant="contained" onClick={addItem} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>+</Button>
        {error && <div className={s.error}>please enter title</div>}
    </div>

}