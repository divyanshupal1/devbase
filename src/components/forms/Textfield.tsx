"use client"

import React, { useState } from 'react'
import { AddIcon, CloseIcon, DeleteIcon, ExitIcon, InfoIcon, UserIcon } from '../Icons/Icons'
// import  Input from "@/components/ui/input"

export const Textfield = () => {
    const [sheetTitle,setSheetTitle] = useState<string>("")
    const [value, setValue] = useState<string[]>([""])
    const [disabled, setDisabled] = useState<boolean>(false)

    console.log(value)

    
    const handleSheetChnage = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSheetTitle(e.target.value)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let temp = [...value]
        temp[e.target.tabIndex] = e.target.value
        setValue(temp)
    }
    const handleAdd = () => {
        let temp = [...value,""]
        setValue(temp)
    }
    const handleRemove = (i:number) => {
        let temp = [...value]
        temp.splice(i, 1)
        setValue(temp)
    }

    function formAction(e: React.FormEvent<HTMLFormElement>) {
        setDisabled(true)
        e.preventDefault()
        fetch('/api/user/sheets/create', {
            method: "POST",
            body: JSON.stringify({
                title: sheetTitle,
                columns:value
            })
        }).then(res => {
            if (res.ok) alert("success")
            else alert("error")
            setDisabled(false)
        }
        )
    }


    return (
        <>
            <form
                onSubmit={(e) => formAction(e)}
                className='flex flex-col p-5 gap-y-2 items-center justify-center w-[90vw] md:max-w-[600px] max-h-[80vh]  bg-neutral-950 border border-neutral-900  rounded-md drop-shadow-lg shadow-neutral-400'
            >
                <div className='w-full text-left'>
                    <h1 className='text-2xl text-slate-50'>Create sheet</h1>
                </div>
                <div className="sheet-info w-full h-fit mt-1">
                    <label htmlFor="sheet-title" className='text-lg text-slate-50'>Title</label><br/>
                    <div className='w-full mt-2'>
                    <Input type={"text"} index={0} value={sheetTitle} onChange={handleSheetChnage} />
                    </div>
                </div>
                <div className='w-full text-left mt-4'>
                    <h1 className='text-xl text-slate-50'>Columns</h1>
                </div>
                <div className="sheet-info w-full max-h-[400px] overflow-hidden overflow-y-scroll rounded-md">
                    <div className='w-[98%] mr-2 p-1'>
                    {value.map((val, i) => {
                        return <InputAction type={"text"} key={i} index={i} value={val} onChange={handleChange} action={handleRemove} />
                    })}
                    </div>
                   
                    {/* <Input type={"text"} index={0} value={sheetTitle} onChange={handleSheetChnage} /> */}
                </div>
                <div className='flex justify-end w-full'>
                    <button type="button" onClick={handleAdd} className='text-slate-50 flex items-center gap-x-2 mt-2 p-3 py-2 rounded-full bg-neutral-800 focus:outline-none'>
                        <AddIcon />
                        <span>Add Column</span>
                    </button>
                </div>
                <div className='w-full flex justify-end self-end'>
                    <button type="button" className='border border-slate-50 text-slate-50  p-2 rounded-md mt-3 px-4'>Cancel</button>
                    <button type="submit" disabled={disabled} className='bg-slate-50  p-2 rounded-md mt-3 ml-3 px-5'>Create</button>
                </div>

            </form>

        </>
    )
}


// export const Input = ({value,onChange,type,index}:{value:string|number,onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,type:String,index:number}) => { 
//     return (
//         <input type="text" name='username' required autoComplete='off' value={value} tabIndex={index} onChange={(e)=>onChange(e)} className='min-w-[150px] w-full p-2 rounded-md focus:bg-black border border-neutral-700 bg-transparent text-white file:bg-transparent file:border-0 file:border-r-2  file:text-white' />
//     )
//   }


export const InputAction = ({value,onChange,type,index,action}:{value:string,onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,type:String,index:number,action:(i:number)=>void}) => {
    const [hidden,setHidden] = useState<boolean>(true)
    return (
        <div className='w-full flex mt-2'>
            <div className='flex items-center justify-start rounded-full text-slate-50 mr-2'>{index+1}.</div>
            <Input type={"text"}  index={index} value={value} onChange={onChange}/>
            {<div className=' w-[64px] flex items-center justify-center relative '>
                {index==0 && <div className={`absolute ${hidden?'hidden':'block'} bg-red-500 text-gray-100 whitespace-nowrap p-1 px-2 rounded-md right-11`}>one column is necessary</div>}
                <div className='w-[44px] flex items-center justify-center rounded-full'
                 onClick={()=>{
                    if(index>0) action(index)
                    else setHidden(!hidden)}}
                 >
                    
                    {index!=0 ?<CloseIcon/>: <InfoIcon/>}
                </div>
            </div>}
        </div>

    )
}
