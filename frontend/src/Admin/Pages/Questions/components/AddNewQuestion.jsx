import { Book, X } from 'lucide-react'
import React, { useState } from 'react'
import { useQuestionStore } from '../../../../Questions/store/QuestionStore'
const AddNewQuestion = ({ openDialog, setOpenDialog }) => {

    const { setQuestions, loading } = useQuestionStore();
    const [input, setInput] = useState({
        question: '',
        qsType: '',
        category: '',
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        await setQuestions(input);
        setOpenDialog(false);

        setInput({
            question: '',
            qsType: '',
            category: ''
        })
    }

    return (
        <dialog className="modal" open={openDialog}>
            <div className="modal-box">
                <div className='flex items-center justify-between'>
                    <h3 className="text-lg font-bold">Add Question</h3>
                    <button className='btn btn-sm btn-ghost' onClick={() => setOpenDialog(false)}><X /></button>
                </div>
                <div className='divider divider-primary'></div>
                <div className="modal-action">
                    <form className='flex flex-col justify-end w-full px-3' onSubmit={handleSubmit}>
                        <div className='my-1'>
                            <label className='inline-flex gap-2 font-bold'><Book /> Question</label>
                            <textarea className="w-full textarea textarea-primary" required name='question' value={input.question} onChange={(e) => setInput({ ...input, ["question"]: e.target.value })} placeholder="Enter Question"></textarea>
                        </div>
                        <div className='grid my-2 sm:grid-cols-2'>
                            <div className='p-2 sm:border-r-2 border-primary'>
                                <h1 className='font-bold text-center'>Hardness</h1>
                                <hr className='h-0.5 bg-primary' />
                                <select required name='qsType' onChange={changeEventHandler} value={input.qsType} className="w-full my-5 select select-primary">
                                    <option disabled value={""}>Select Hardness</option>
                                    <option value='easy'>Easy</option>
                                    <option value='moderate'>Moderate</option>
                                    <option value='hard'>Hard</option>
                                </select>

                            </div>
                            <div className='p-2'>
                                <h1 className='font-bold text-center'>Category</h1>
                                <hr className='h-0.5 bg-primary' />

                                <select required name='category' onChange={changeEventHandler} value={input.category} className="w-full my-5 select select-primary">
                                    <option disabled value={""}>Category</option>
                                    <option value='Psychological'>Psychological</option>
                                    <option value='Current Affairs'>Current Affairs</option>
                                    <option value='History'>History</option>
                                    <option value='General Ability'>General Ability</option>
                                    <option value='Aptitude'>Aptitude</option>
                                    <option value='Technology'>Technology</option>
                                </select>
                            </div>
                        </div>

                        <button className='btn btn-sm btn-primary' type='submit'>{loading ? <span className='loading loading-spinner'></span> : 'Save'}</button>
                        {/* if there is a button in form, it will close the modal */}
                        <div className='flex items-center justify-end gap-3 mt-2'>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AddNewQuestion