import React, { useState } from 'react'
import { AddIcon, DeleteIcon, UserIcon } from '../Icons/Icons'

export const Textfield = () => {

  function formAction(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    fetch('/api/form',{
        method:"POST",
        body:JSON.stringify({
            name:e.currentTarget.username.value,
            email:e.currentTarget.email.value
        })
        }).then(res=>{
            if(res.ok) alert("success")            
            else alert("error")            
        }
    )
    }
    

  return (
    <>
    <form 
    onSubmit={(e)=>formAction(e)}
    className='flex flex-col p-5 gap-y-2 items-center justify-center w-[90vw] md:max-w-[600px]   bg-neutral-950 border border-neutral-900  rounded-md drop-shadow-lg shadow-neutral-400' 
     >
    <h3 className='text-white text-left w-full text-xl'>Create Sheet</h3>
    <div className=' w-full h-full mt-3 flex flex-col gap-y-2 '>
        <div className='flex items-start flex-col justify-center w-full '>
        <label htmlFor="title" className='text-white text-base pl-1'>Title</label>
        <input type="text" name='username' className='min-w-[150px] w-full p-2 mt-2 rounded-md focus:bg-black border border-neutral-700 bg-transparent text-white file:bg-transparent file:border-0 file:border-r-2  file:text-white'/>
        </div>

        <div className='w-full mt-4 flex flex-col justify-start items-end'>

            <h4 className='text-white text-left w-full text-lg'>Columns</h4>

            <div className='flex flex-col items-center justify-center w-full gap-x-2 lg:flex-row lg:justify-start'>
                
                <input type="text" name='username' className=' w-full lg:w-[60%] p-2 mt-2 rounded-md focus:bg-black border border-neutral-700 bg-transparent text-white file:bg-transparent file:border-0 file:border-r-2  file:text-white'/>
                
                <div className='flex mt-2 gap-x-3 w-full lg:w-[40%]'>
                    <input type="text" name='username' className=' p-2 lg:w-auto rounded-md focus:bg-black border border-neutral-700 bg-transparent text-white file:bg-transparent file:border-0 file:border-r-2  file:text-white'/>
                    <div className=' grid place-items-center h-full bg-neutral-800  rounded-full lg:h-[40px] lg:w-[40px]'>
                        <DeleteIcon/>
                    </div>
                </div>

            </div>

            <div className='p-3 flex items-center bg-neutral-800 rounded-full mt-4 gap-x-3 text-white px-4' >
                <AddIcon/> Add Column
            </div>
            
    
        </div>
        
    </div>
    <div className='w-full flex justify-end'>
    <button type="submit" className='border border-slate-50 text-slate-50  p-2 rounded-md mt-3 px-4'>Cancel</button>
    <button type="submit" className='bg-slate-50  p-2 rounded-md mt-3 ml-3 px-5'>Create</button>
    </div>

    </form>

    </>
  )
}
