import React, { useEffect, useState } from 'react'
import { useQuestionStore } from '../../../Questions/store/QuestionStore';
import Question from './components/Question';
import AddNewQuestion from './components/AddNewQuestion';

const QuestionsList = () => {
    const { loading, getAllQuestions, questions, count } = useQuestionStore();
    const [openDialog, setOpenDialog] = useState(false);
    useEffect(() => {
        getAllQuestions();
    }, [questions])
    return (
        <div className='h-[90vh] p-4 mx-auto max-w-7xl'>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='font-serif text-2xl font-semibold'>Interview Question ({count})</h1>
                <button className='font-bold rounded-full btn btn-sm btn-primary' onClick={() => setOpenDialog(true)}>Add + </button>

                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <AddNewQuestion openDialog={openDialog} setOpenDialog={setOpenDialog} reload />
            </div>
            {/* Questions List */}
            <div className='h-[80vh] overflow-auto p-2 rounded-lg'>
            {loading ?
                    <div className="flex flex-col gap-4 w-52">
                        <div className="w-full h-32 skeleton"></div>
                        <div className="h-4 skeleton w-28"></div>
                        <div className="w-full h-4 skeleton"></div>
                        <div className="w-full h-4 skeleton"></div>
                    </div>
                    :
                    questions && questions.map((question, idx) => (
                        <Question question={question} key={idx} />
                    ))
                }
                
                </div>
        </div>
    )
}

export default QuestionsList;