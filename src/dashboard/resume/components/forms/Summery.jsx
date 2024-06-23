import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { BrainCircuit, LoaderCircle } from 'lucide-react';
import { AIChatSession } from './../../../../../service/AiModel';

const prompt = "Job Title: {jobTitle}, Depends on job title give me a list of summaries for 3 experience levels: Senior, Mid Level, and Fresher level in 3-4 lines in array format, with summary and experience_level fields in JSON format";

function Summery({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummaryList, setAiGenerateSummeryList] = useState();

  useEffect(() => {
    if (summery) {
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
    }
  }, [summery]);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
    console.log(PROMPT);
    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      const parsedResponse = JSON.parse(responseText);
      setAiGenerateSummeryList(parsedResponse);
    } catch (error) {
      console.error('Error generating summary:', error);
      if (error.message.includes('Failed to fetch')) {
        toast.error('Network error. Please check your internet connection and try again.');
      } else {
        toast.error('An error occurred while generating the summary. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summery: summery,
      },
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        enableNext(true);
        setLoading(false);
        toast.success('Details Updated');
      },
      (error) => {
        console.error('Error updating resume:', error);
        setLoading(false);
        toast.error('An error occurred while updating the resume. Please try again.');
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add a summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={GenerateSummeryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <BrainCircuit className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea className="mt-5" required onChange={(e) => setSummery(e.target.value)} />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummaryList && (
        <div>
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div key={index}>
              <h2 className="font-bold my-1">Level: {item?.experience_level}</h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summery;
