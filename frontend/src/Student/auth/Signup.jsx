import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react'
import { useAuthStore } from '../store/authStore';
const Signup = () => {
    const [input, setinput] = useState({
        name: '',
        Application_No: '',
        mobile: '',
        email: '',
        password: '',
        dob: '',
        file: ''
    })

    const navigate = useNavigate();
    const { loading, signup } = useAuthStore();

    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = (e) => {
        setinput({ ...input, file: e.target.files?.[0] });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("email", input.email);
        formData.append("mobile", input.mobile);
        formData.append("dob", input.dob);
        formData.append("Application_No", input.Application_No);
        formData.append("password", input.password);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            await signup(formData);
            navigate('/login');
        } catch (error) {

        }
    }
    return (
        <div>
            <div className='flex items-center justify-center p-5 mx-auto max-w-7xl'>
                <form onSubmit={handleSubmit} className='p-4 my-10 rounded-lg shadow-md md:border-gray-200 lg:w-1/2'>
                    <h1 className='p-3 mb-5 text-xl font-bold text-center text-gray-200 rounded-lg bg-primary'>Sign Up </h1>
                    <div className='grid grid-cols-1 md:gap-5 md:grid-cols-2'>
                        <div>
                            {/* Full Name */}
                            <div className='flex flex-col gap-2 px-3 my-3'>
                                <label>Full Name</label>
                                <input className='input input-bordered input-primary input-sm' type='text' value={input.name} name='name' onChange={changeEventHandler} placeholder='Enter your name' />
                            </div>
                            {/* Email */}
                            <div className='flex flex-col gap-2 px-3 my-3'>
                                <label>E-mail</label>
                                <input className='input input-bordered input-primary input-sm' type='email' value={input.email} name='email' onChange={changeEventHandler} placeholder='Enter your email' />
                            </div>

                            {/* Password */}
                            <div className='flex flex-col gap-2 px-3 my-3'>
                                <label>Password</label>
                                <input className='input input-bordered input-primary input-sm' type='password' value={input.password} name='password' onChange={changeEventHandler} placeholder='Enter password' />
                            </div>
                        </div>
                        <div>
                            {/* Mobile Number */}
                            <div className='flex flex-col gap-2 px-3 my-3'>
                                <label>Mobile Number</label>
                                <input className='input input-bordered input-primary input-sm' type='text' value={input.mobile} name='mobile' onChange={changeEventHandler} placeholder='Enter your phone number' />
                            </div>
                            {/* Application Number */}
                            <div className='flex flex-col gap-2 px-3 my-3'>
                                <label>Application Number</label>
                                <input className='input input-bordered input-primary input-sm' type='text' value={input.Application_No} name='Application_No' onChange={changeEventHandler} placeholder='Enter your Application number' />
                            </div>
                            {/* Date of Birth */}
                            <div className='flex flex-col gap-2 px-3 my-3'>
                                <label>Date of Birth</label>
                                <input className='input input-bordered input-primary input-sm' type='date' value={input.dob} name='dob' onChange={changeEventHandler} placeholder='Enter your Date of Birth' />
                            </div>
                        </div>
                        {/* Profile Picture */}
                        <div className='flex flex-col gap-2 px-3 my-3 md:col-span-2'>
                            <label>Profile</label>
                            <input accept='image/*'
                                onChange={changeFileHandler}
                                type='file'
                                className="w-full file-input file-input-bordered file-input-sm file-input-primary"
                            />
                        </div>
                    </div>

                    <button type='submit' disabled={loading} className='w-full my-3 btn-sm btn btn-primary'>{loading ? <Loader className='w-4 h-4 mr-2 animate-spin' /> : 'Submit'}</button>
                    <span className='text-sm'>Already have an account <Link to={'/login'}><span className='font-bold text-blue-600'>Login</span></Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup