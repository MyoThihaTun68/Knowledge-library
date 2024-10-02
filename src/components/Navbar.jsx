import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      <nav className='border-b-2'>
        <ul className='flex justify-around p-3'>
          <li className='flex items-center gap-2'>
            <Link className='flex items-center gap-2 text-white' to="/home">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
              </svg>
              <span className='text-2xl font-bold hidden md:block'>Knowledge Library</span>
            </Link>
          </li>
          {location.pathname === '/home' && (
            <li className='mx-1 hidden md:flex items-center gap-3'>
              {username && email ? (
                <div className="flex items-center text-white">
                  <p className="mr-4">Welcome, {email}</p>
                </div>
              ) : null}
            </li>
          )}
          <li className='mx-1 flex items-center gap-3'>
            {location.pathname === '/home' && (
              <Link to="/create" className='flex text-white border hover:bg-zinc-700 px-3 py-2 rounded-xl'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span className="hidden md:block">Create Post</span>
              </Link>
            )}
            <button onClick={handleLogout} className="hover:bg-red-600 bg-red-500 flex items-center text-white border px-3 py-2 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                  </svg>
              <span className="hidden md:block">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
