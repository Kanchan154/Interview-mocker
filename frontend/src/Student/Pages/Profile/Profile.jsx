import React from 'react'
import { useAuthStore } from '../../store/authStore'
import { CalendarHeart, Mail, Phone, User, UserCheck } from 'lucide-react';

const Profile = () => {
    const { user } = useAuthStore();
    return (
        <div>
            <div className='w-full px-10 h-[90vh]'>
                <div className='grid h-full grid-cols-2 gap-5 mx-auto'>
                    <div className='grid'>
                        <div className="p-5 mt-16 max-md:justify-center max-md:items-center avatar">
                            <div className="rounded-full ring size-64 ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    alt="Profile"
                                    src={user.profile.ProfilePic} />
                            </div>
                        </div>

                        <div className='p-2 font-serif text-lg font-bold rounded-lg shadow-lg'>
                            <h1 className='flex gap-3 my-3'><User/> {user.name}</h1>
                            <h1 className='flex gap-3 my-3'><Mail/> {user.email}</h1>
                            <h1 className='flex gap-3 my-3'><Phone/> {user.mobile}</h1>
                            <h1 className='flex gap-3 my-3'><UserCheck/> {user.Application_No}</h1>
                            <h1 className='flex gap-3 my-3'><CalendarHeart/> {user.dob}</h1>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Profile