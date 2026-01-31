import React, { useState } from 'react'
import { Loader } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const Login = () => {
  const [input, setinput] = useState({
    loginCredential: '',
    password: '',
  })

  const navigate = useNavigate();

  const { loading, login } = useAuthStore();

  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(input);
      
      navigate('/');

    } catch (error) {

    }

  }
  return (
    <div>
      <div className='flex items-center justify-center p-5 mx-auto max-w-7xl'>
        <form onSubmit={handleSubmit} className='p-4 my-10 rounded-lg shadow-md md:border-gray-200 sm:w-1/2'>
          <h1 className='p-3 mb-5 text-xl font-bold text-center text-gray-200 rounded-lg bg-primary'>Log In</h1>
          <div>

            {/* Login Credential */}
            <div className='flex flex-col gap-2 px-3 my-3'>
              <label>Login Credential</label>
              <input required className='input input-bordered input-primary input-sm' type='text' value={input.loginCredential} name='loginCredential' onChange={changeEventHandler} placeholder='Enter your email or Application Number or Mobile Number' />
            </div>
            {/* Password */}
            <div className='flex flex-col gap-2 px-3 my-3'>
              <label>Password</label>
              <input required className='input input-bordered input-primary input-sm' type='password' value={input.password} name='password' onChange={changeEventHandler} placeholder='Enter password' />
            </div>
          </div>
          <button type='submit' disabled={loading} className='w-full my-3 btn-sm btn btn-primary'>{loading ? <Loader className='w-4 h-4 mr-2 animate-spin' /> : 'Submit'}</button>
          <span className='text-sm'>Don't have an account <Link to={'/signup'}><span className='font-bold text-blue-600'>Signup</span></Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login