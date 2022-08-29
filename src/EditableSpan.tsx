import React, {ChangeEvent, useState} from 'react';


type PropsType = {
    title: string
    editedTaskTitle: (title:string) => void
}


export const EditableSpan = (props:PropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);

    const [title, setTitle] = useState<string>(props.title)

    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{

        setTitle(e.currentTarget.value)

        props.editedTaskTitle(title)

    }



    const activateViewMode=()=>{
       setEditMode(false)
    }

    const activateEditMode=()=>{
        setEditMode(true)
    }


    return (
        editMode ? <input value={title} autoFocus onChange={onChangeHandler} onBlur={activateViewMode}/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
    )

}