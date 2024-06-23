import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../service/AiModel';
import { toast } from 'sonner';

const    name ='fef'
const PROMPT='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'
function RichTextEditor({onRichtextEditor, index,defaultValue}) {
    const [value, setValue] =useState(defaultValue);
   const{resumeInfo, setResumeInfo}=useContext(ResumeInfoContext);
   const[loading, setLoading]=useState(false);

    const GenerateSummeryFromAi=async()=>{
        setLoading(true)
        if(!resumeInfo.experience[index].title)
        {
           toast('Please add Position Title');
           return ;
        }
        const prompt=PROMPT.replace('{positionTitle}',resumeInfo.experience[index].title)
        const result = await AIChatSession.sendMessage(prompt);
        console.log(result.response.text());
        const resp= result.response.text()
        setValue
        (resp.replace('[','').replace(']',''));
        setLoading(false);
         
    }

  return (
    <div>
        <div className='flex justify-between my-2'>
            <label className='text-xs'>Summary</label>
            <Button variant='outline' size='sm'
            onClick={GenerateSummeryFromAi}
            className='flex gap-2 border-primary text-primary'>
                {loading?
                <LoaderCircle className='animate-spin'/>:
                <><Brain className='h-4 w-4'/> Generate from AI</>
               }
     </Button>
        </div>
        <EditorProvider>
            <Editor value={value} onChange={(e)=>{
                setValue(e.target.value);
                onRichtextEditor(e);
            }}>
                <Toolbar>
                    <BtnBold/>
                    <BtnItalic/>
                    <BtnUnderline/>
                    <BtnStrikeThrough/>
                    <Separator/>
                    <BtnNumberedList/>
                    <BtnBulletList/>
                    <BtnLink/>
        <BtnClearFormatting/>
                    
                </Toolbar>

            </Editor>
        </EditorProvider>
    </div>
  )
}

export default RichTextEditor