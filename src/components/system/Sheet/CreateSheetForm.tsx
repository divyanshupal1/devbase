import React,{useState} from 'react'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select"
import {MdDeleteOutline,MdInfoOutline,MdFlashOn} from "react-icons/md"

function AnimatedFlash(){
  return <div className='animate-shake'><MdFlashOn className="scale-125 drop-shadow-4xl" /></div>
}

interface InputElementProps {
  index:number,
  value:string[],
  total:number,
  submitting?:boolean,
  handleChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
  typeChange:(v:string,i:number)=>void,
  handleDelete:(i:number)=>void
}

export function InputElement({index,value,handleChange,typeChange,handleDelete,total,submitting}:InputElementProps) {
  
  return (
    <div className='flex items-center gap-x-3 w-full'>
      {/* <span>{index+1}.</span> */}
      <div className='relative w-full'>
        {value[0].length<1 && <div className='absolute top-[-8px] text-sm right-0 bg-neutral-950 px-1 rounded-full text-red-600 pointer-events-none'>cannot be empty</div>}
        <Input type='text' disabled={submitting} name={`column${index}`}  placeholder="Column Name" onChange={handleChange} value={value[0]} tabIndex={index} className={value[0].length<1?"outline outline-1 outline-red-600 w-full":"w-full"}/>
      </div>
      <div>
      <Select value={value[1]} onValueChange={(v)=>typeChange(v,index)} disabled={submitting}>
        <SelectTrigger className="w-[120px]">
          <SelectValue/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectLabel>Data Type</SelectLabel> */}
            <SelectItem value="str">String</SelectItem>
            <SelectItem value="num">Number</SelectItem>
            <SelectItem value="bool">Boolean</SelectItem>
            <SelectItem value="any">Any</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      </div>
      {/* <div className='scale-125 bg-neutral-800 p-2 rounded-full cursor-pointer' onClick={()=>handleDelete(index)}><MdDeleteOutline/></div> */}
      <TooltipProvider>
        <Tooltip >
          <TooltipTrigger disabled={submitting} onClick={()=>handleDelete(index)} className="text-white bg-neutral-800 p-3 rounded-full cursor-pointer disabled:opacity-60">{total>1 ?<MdDeleteOutline fill="white" className="scale-150"/>: <MdInfoOutline fill="red" className="scale-150"/>}</TooltipTrigger>
          <TooltipContent className={total>1?'bg-white rounded-full':'bg-red-700 rounded-full text-white'}>
            <p>{total>1 ?"Delete Column": "One Column is necessary"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
