import { Delete, Download, Eye, LoaderCircle, MoreVertical, Notebook, Pen, PenBox, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//Dropdown
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// ALERt
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,

} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'



function ResumeCarItem({resume,refreshData}) {

  const navigation = useNavigate();
  const[openAlert, setOpenAlert]=useState(false);
  const [loading, setLoading]=useState(false)

  // const onMenuClick=(url)=>{
  //    navigation(url)
  // }

  const onDelete=()=>{
    setLoading(true)
    GlobalApi.DeleteResumeById(resume.documentId).then(resp=>{
      //console.log(resp.data);
      toast('Resume Deleted')
      refreshData();
      setLoading(false);
      setOpenAlert(false);
     },(error)=>{
       setLoading(false);
       toast('An error occurs')
     })
  }
  return (
    <div className=''> 
    <Link to={'/dashboard/resume/'+resume.documentId+'/edit'}>
    
      <div className='p-14  bg-gradient-to-b
          from-blue-100 via-purple-200 to-red-200
        h-[280px] 
          rounded-t-lg border-t-4'
          style={{
            borderColor:resume?.themeColor
          }}
          >
            <div className='flex items-center justify-center h-[180px]'>
          <img src='/cv.png'width={80} height={80} />
          </div>
      </div>
      </Link>
      <div className='border p-3 flex justify-between  text-black rounded-b-lg shadow-lg'
      style={{
        background:resume?.themeColor
      }}>
      
      <h2 className='text-sm'>{resume.title}</h2>
     
      <DropdownMenu>
  <DropdownMenuTrigger> <MoreVertical className='h-4 w-4 cursor-pointer'/></DropdownMenuTrigger>
  <DropdownMenuContent>
    
  
  <DropdownMenuItem  onClick={()=>navigation('/dashboard/resume/'+resume.documentId+"/edit")}> <PenBox size={10} className='translate-x-[-5px]'/> Edit</DropdownMenuItem>
    <DropdownMenuItem  onClick={()=>navigation('/my-resume/'+resume.documentId+"/view")}> <Eye size={10} className='translate-x-[-5px]'/> View</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.documentId+"/view")} ><Download size={10} className='translate-x-[-5px]'/> Download</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>setOpenAlert(true)} > <Trash size={10} className='translate-x-[-5px]'/> Delete</DropdownMenuItem>


  </DropdownMenuContent>
</DropdownMenu>
<AlertDialog open={openAlert}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your resume
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={onDelete} disabled={loading} >
        {loading? <LoaderCircle className='animate-spin'/>:
        'Delete'}
        </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


      </div>
   </div>
   
  )
}

export default ResumeCarItem