import { Trash2 } from 'lucide-react'
import React from 'react'
import { useQuestionStore } from '../../../../Questions/store/QuestionStore'

const Question = ({ question }) => {
    const { deleteQuestion, loading } = useQuestionStore();
    const handleDelete = async (id) => {
        await deleteQuestion(id);
    }
    return (
        <div className='my-5'>
            <div className="collapse collapse-plus bg-base-300">
                <input type="checkbox" />
                <div className="font-serif text-lg font-semibold collapse-title">
                    <h1 className='font-normal text-justify'>{question.question}</h1>
                </div>
                <div className="relative gap-4 collapse-content bg-base-200">
                    <div className='grid p-3 pb-0 sm:grid-cols-2'>
                        <p><span className='font-bold '>Hardness Level </span>: {question.qsType[0].toUpperCase() + question.qsType.slice(1)}</p>
                        <p><span className='font-bold'>Category</span> : {question.category}</p>
                    </div>
                    {/* The button to open modal */}
                    <button className="absolute text-red-500 right-4 bottom-4 curser-pointer" onClick={()=>handleDelete(question._id)}>{loading ? <span className='loading loading-dots'></span> : <Trash2 className='cursor-pointer' />}</button>
                </div>
            </div>
        </div>
    )
}

export default Question