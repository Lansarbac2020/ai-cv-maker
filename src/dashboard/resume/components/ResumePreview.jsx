
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonnelDetailPreview from './preview/PersonnelDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationelPreview from './preview/EducationelPreview'
import SkillPreview from './preview/SkillPreview'

function ResumePreview() {

    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]' style={{
        borderColor: resumeInfo?.themeColor
    }}>
        {/* Personel detail */}

      <PersonnelDetailPreview resumeInfo={resumeInfo}/>

        {/* summary */}
    <SummaryPreview resumeInfo={resumeInfo}/>


        {/* Professionel Experience */}
               <ExperiencePreview resumeInfo={resumeInfo}/>


        {/* Educations */}
        <EducationelPreview resumeInfo={resumeInfo}/>


        {/* skills */}
        <SkillPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview