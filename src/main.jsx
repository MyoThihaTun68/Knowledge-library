import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.jsx'
import './index.css'
import Create from './pages/Create.jsx'
import Search from './pages/Search.jsx'
import Layouts from './pages/Layouts/Layouts.jsx'
import NoteDetail from './components/NoteDetails.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts/>,
    children: [
      {
        path: "/home",
        element: <Home/>,
      },
      {
        path: "/create",
        element: <Create/>,
      },
      {
        path: "/search",
        element: <Search/>,
      },
      {
        path: "/note/:id", // Define route parameter for note ID
        element: <NoteDetail />, // Replace NoteDetail with your actual detail page component
      },
      {
        path: "/",
        element: <Signup/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
  
)
