import { useState} from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { MdAdd } from 'react-icons/md'
import { useToast } from "@/components/ui/use-toast"
import {InputElement} from '@/components/system/Sheet/CreateSheetForm'
import axios from 'axios'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function CreateDialog(){
    const [submitting, setSubmitting] = useState(false)
    const { toast } = useToast()
    const [sheetTitle,setSheetTitle] = useState<string>("")
    const [value, setValue] = useState<string[][]>([["S.No",'num']])
  
    const formAction = (e: React.FormEvent<HTMLFormElement>) => {}
    const handleSheetChnage = (e:React.ChangeEvent<HTMLInputElement>) => {
      setSheetTitle(e.target.value)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let temp = [...value]
      temp[e.target.tabIndex][0] = e.target.value
      setValue(temp)
    }
    const typeChange = (v:string,i:number) => {
      let temp = [...value]
      temp[i][1] = v
      setValue(temp)
      console.log(temp)
    }
    const handleAdd = () => {
      let temp = [...value,["",'any']]
      setValue(temp)
    }
    const handleRemove = (i:number) => {
      if(value.length>1){
        let temp = [...value]
        temp.splice(i, 1)
        setValue(temp)
      }
    }  
    const verify = () => {
      let flag = true
      value.forEach((val)=>{
        if(val[0]===""){
          flag = false
        }
      })
      return flag
    }
    const submitForm = () => {
      console.log(value.reduce((acc,curr)=>acc+"["+curr[0]+","+curr[1]+"]"+", ",""))
      setSubmitting(true)
      axios.post("/api/user/sheets/create",{
        title:sheetTitle,
        columns:value
      }).then((res)=>{
        console.log(res)
        toast({
          title: "Sheet Created",
          description: "Your sheet has been created successfully",
        })
        setSubmitting(false)
      }).catch((err)=>{
        console.log(err)
        toast({
          title: "Error",
          description: "Something went wrong",
        })
        setSubmitting(false)
      })
    }
    
    return (
      <Dialog onOpenChange={()=>{
        setSubmitting(false)
        setSheetTitle(""),
        setValue([["S.No",'num']])
      }}>
        <DialogTrigger asChild>
          <Button variant="outline">Create Sheet</Button>
        </DialogTrigger>
        <DialogContent className="w-[450px] sm:max-h-[calc(100vh-100px)] max-sm:w-screen max-sm:h-screen max-sm:flex flex-col max-sm:overflow-x-hidden max-sm:overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Create Sheet</DialogTitle>
            <DialogDescription>use this sheet as database</DialogDescription>
          </DialogHeader>
          <form onSubmit={(e)=>e.preventDefault()}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Title</Label>
                <Input disabled={submitting}  placeholder="Name of your sheet" onChange={handleSheetChnage} value={sheetTitle}/>
              </div>
            
              <div className="flex flex-col w-full ">
                  <Label htmlFor="name">Column</Label>
                  <div className='flex flex-col mt-3 p-1 gap-y-2 sm:overflow-x-hidden sm:overflow-y-scroll sm:max-h-[calc(100vh-450px)] scrollbar-custom w-full'>
                      {value.map((val, i) => {
                          return <InputElement key={i} index={i} value={val} handleChange={handleChange} typeChange={typeChange} handleDelete={handleRemove} total={value.length} submitting={submitting}/>
                      })}
                  </div>
                  <Button variant="secondary" disabled={submitting} onClick={handleAdd} className="mt-3 w-[140px]"><MdAdd className="scale-150 mr-3"/> Add Column</Button>
              </div>
              
            </div>
          </form>
          <DialogFooter className='max-sm:mt-auto'>
              <div className="flex justify-end gap-x-4 align-bottom">
                  <DialogClose asChild>
                    <Button variant="secondary" onClick={()=>console.log("cloasing...")} >Discard</Button>
                  </DialogClose>              
                  <Button 
                    disabled={!verify()}
                    type='submit'
                    onClick={() => {
                      setSubmitting(!submitting)
                      submitForm()
                    }}              
                  >Create</Button>
              </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  
    )
  }
  