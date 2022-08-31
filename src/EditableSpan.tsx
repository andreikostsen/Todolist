import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type PropsType = {
    title: string
    editedTitle: (title:string) => void
}


export const EditableSpan = (props:PropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);

    const [title, setTitle] = useState<string>(props.title)
    console.log(title)
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{

        setTitle(e.currentTarget.value)


        }

    const onKeyDownHandler=(e:KeyboardEvent<HTMLInputElement>)=>{

        if(e.key == "Enter") {
            activateViewMode()

        }

    }


    const activateViewMode=()=>{
       setEditMode(false)
        props.editedTitle(title.trim())
    }

    const activateEditMode=()=>{
        setEditMode(true)
    }


    return (
        editMode ? <input value={title} autoFocus onChange={onChangeHandler} onBlur={activateViewMode} onKeyDown={onKeyDownHandler}/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
    )

}