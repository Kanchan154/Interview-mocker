import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../Student/store/authStore';
import { Loader, LogOut, Menu, Moon, Sun } from 'lucide-react';
import { useAdminStore } from '../../Admin/adminStore/adminAuthStore';

const Navbar = () => {

  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "autumn");

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("sunset")
    }
    else {
      setTheme("light")
    }
  }

  useEffect(() => {
    localStorage.setItem("theme", theme)
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html').setAttribute("data-theme", localTheme)
  }, [theme])


  const { logout, loading, user } = useAuthStore();
  const {Adminlogout, loading1, admin} = useAdminStore();

  const Logout = async () => {
    try {
      await logout();
    } catch (error) {

    }
  }

  const AdminLogout = async () => {
    try {
      await Adminlogout();
    } catch (error) {
      
    }
  }
  
  return (
    <div className='sticky top-0 z-10 flex items-center justify-between w-full h-16 py-8 mx-auto max-w-7xl max-xl:p-5'>
      {/* Logo */}
      <div>
        <Link to={'/'}>
          <h1 className='text-2xl font-bold'>DRDO <span className='font-extrabold text-primary'>Hunt</span></h1>
        </Link>
      </div>
      {/* Menu */}
      <div>
        <ul className='items-center hidden gap-5 font-medium sm:flex'>
          <Link to={'/'}><li>Home</li></Link>
          {
            admin ? (
              <Link to={'/admin/questions'}>Questions</Link>
            ) : (
              <Link to={'/practice'}><li>Practice</li></Link>
            )
          }
          <Link to={'/browse'}><li>Browse</li></Link>
        </ul>
      </div>
      <div className={`flex items-center ${user ? " gap-5" : "gap-2"} `}>
        {/* Theme Controller */}
        <label className="items-center swap swap-rotate " >
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" onChange={handleToggle} />

          {/* sun icon */}
          <Sun className="fill-current size-5 swap-on" />

          {/* moon icon */}
          <Moon className="fill-current size-5 swap-off" />
        </label>

        {/* Profile */}
        {
          user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="border btn btn-ghost btn-circle size-9 avatar">
                <div className="w-10 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                  <img
                    alt="Profile"
                    src={user.profile.ProfilePic} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link to={'/profile'} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li><Link to={'/setting'}>Settings</Link></li>
                <li className='justify-between' onClick={Logout}>{loading ? <Loader className='animate-spin' /> : <span className='flex justify-between'>Logout <LogOut className='size-4' /></span>}</li>
              </ul>
            </div>
          ) :
          admin ?
          (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="border btn btn-ghost btn-circle size-9 avatar">
                <div className="w-10 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                  <img
                    alt="Profile"
                    src={'/drdo.png'} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link to={'/admin/questions'} className="justify-between">
                    Questions
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li><Link to={'/setting'}>Settings</Link></li>
                <li className='justify-between' onClick={AdminLogout}>{loading1 ? <Loader className='animate-spin' /> : <span className='flex justify-between'>Logout <LogOut className='size-4' /></span>}</li>
              </ul>
            </div>
          )
          : 
          (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className='flex items-center'><Menu className='size-5' /></div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
                <Link to={'/login'}><li className='p-1 px-2'>SignIn</li></Link>
                <Link to={'/signup'}><li className='p-1 px-2'>SignUp</li></Link>
                <Link to={'/adminLogin'}><li className='p-1 px-2'>Admin Login</li></Link>
              </ul>
            </div>
          )
        }
      </div>

    </div >
  )
}

export default Navbar;
