import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../adminStore/adminAuthStore';
import { Loader } from 'lucide-react';

const AdminLogin = () => {
  const [input, setinput] = useState({
    id: '',
    password: '',
  })

  const navigate = useNavigate();

  const {login, loading1}= useAdminStore();
  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value })
  }
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
     await login(input); 

     navigate('/admin');
    } catch (error) {
      
    }

  }
  return (
    <div>
      <div className='flex items-center justify-center p-5 mx-auto max-w-7xl'>
        <form onSubmit={handleAdminSubmit} className='p-4 my-10 rounded-lg shadow-md md:border-gray-200 sm:w-1/2'>
          <h1 className='p-3 mb-5 text-xl font-bold text-center text-gray-200 rounded-lg bg-primary'>Admin Log In</h1>
          <div>

            {/* ID */}
            <div className='flex flex-col gap-2 px-3 my-3'>
              <label>Admin Id</label>
              <input required className='input input-bordered input-primary input-sm' type='text' value={input.id} name='id' onChange={changeEventHandler} placeholder='Enter your email or Application Number or Mobile Number' />
            </div>
            {/* Password */}
            <div className='flex flex-col gap-2 px-3 my-3'>
              <label>Password</label>
              <input required className='input input-bordered input-primary input-sm' type='password' value={input.password} name='password' onChange={changeEventHandler} placeholder='Enter password' />
            </div>
          </div>
          <button type='submit' disabled={loading1} className='w-full my-3 btn-sm btn btn-primary'>{loading1 ? <Loader className='w-4 h-4 mr-2 animate-spin' /> : 'Submit'}</button>
        </form>

      </div>

    </div>
  )
}

export default AdminLogin