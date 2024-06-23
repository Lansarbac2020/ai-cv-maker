import React, {useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery';
import Experince from './forms/Experince';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';


function FormSection() {
    const[activeFormIndex, setActiveformIndex]=useState(1);
    const[enableNext, setEnableNext]=useState(false);
    const {resumeId}=useParams();
  return (
    <div>
        <div className='flex justify-between items-center'>
          <div className='flex gap-5'>
          <Link to={"/dashboard"}> <Button> <Home/></Button>
          </Link>
          <ThemeColor/>
            
       
          </div>
        <div className='flex gap-2'>
            {activeFormIndex>1
            &&<Button size='sm'
            onClick={()=>setActiveformIndex(activeFormIndex-1)}
            ><ArrowLeft/>
            </Button>}
            <Button 
            disabled={!enableNext}
            className='flex gap-2' size='sm'
            onClick={()=>setActiveformIndex(activeFormIndex+1)}
            >Next <ArrowRight/> </Button>
        </div>
        </div>
        {/* PersonaldetailsForm */}
         {activeFormIndex==1?<PersonalDetails enableNext={(v)=>setEnableNext(v)} />:activeFormIndex==2?
         
         <Summery enableNext={(v)=>setEnableNext(v)}/>
         :activeFormIndex==3?
         <Experince />
         :activeFormIndex==4?
         <Education/>
         :activeFormIndex==5?
         <Skills/>
        :activeFormIndex==6?

        <Navigate to={'/my-resume/'+resumeId+"/view"}/>

         
         :null
        }

          

           {/* Experience */}


           {/* Education  */}


           {/* skills  */}
    </div>
  )
}

export default FormSection