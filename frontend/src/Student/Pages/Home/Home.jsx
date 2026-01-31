import React, { useState } from 'react'
import { Guidelines } from '../../../assets/Guidelines'
import { useAuthStore } from '../../store/authStore';
import { useQuestionStore } from '../../../Questions/store/QuestionStore';
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { getQuestionsForStudent, loading } = useQuestionStore();
  const handlesubmit = async () => {
    await getQuestionsForStudent()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    await navigate(`/interview/${user._id}`);

  }
  return (
    <div className='p-4 mx-auto max-w-7xl'>
      <div className='mb-3'>
        <h1 className='font-mono text-3xl text-center'>Welcome to <strong className='text-primary'>DRDO HUNT</strong></h1>
      </div>
      <div className='p-2 border-2 rounded-3xl border-primary h-[78vh] overflow-auto'>
        <div className=''>
          <h1 className='text-xl font-bold text-center underline'>Guidelines</h1>
          <hr className='h-0.5 my-1 bg-primary' />
          <div>
            <ol className='p-3 font-semibold text-justify list-disc max-sm:text-sm'>
              {
                Guidelines.map((item, idx) => (
                  <li key={idx} className='mx-5 mt-4'>{item}</li>
                ))
              }
            </ol>
          </div>
          <div className='flex items-center px-3' >
            <div className="form-control">
              <label className="gap-5 cursor-pointer label">
                <input type="checkbox" onChange={(e) => setIsChecked(e.target.checked)} className="checkbox checkbox-sm checkbox-primary" />
                <span className="label-text">I understand all the guidelines. I'm ready to start the Interview.</span>
              </label>
            </div>
          </div>
          <div className='flex items-center justify-center mx-auto my-3'>
            <button onClick={handlesubmit} className='btn btn-primary btn-sm' disabled={!isChecked}>{loading ? <span className='loading loading-spinner'></span> : 'Start Interview'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home