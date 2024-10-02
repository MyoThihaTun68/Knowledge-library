import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import NoteDetail from '../../components/NoteDetails'; // Import the detail page component
import './style.css';

export default function Layouts() {
  const location = useLocation();

  // Check if the current route is the detail page
  const isDetailPage = location.pathname.startsWith('/note/');

  return (
    <div className='bg-zinc-800'>
      {/* Navbar Section */}
      <Navbar />
      {/* Dynamic Content Section */}
      <SwitchTransition>
        <CSSTransition timeout={300} classNames='fade' key={location.pathname}>
          <div className='max-w-6xl m-auto p-3'>
            {/* Render either the note list or the detail page based on the route */}
            {isDetailPage ? (
              <NoteDetail />
            ) : (
              <Outlet />
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
