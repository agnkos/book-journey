import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/user/Dashboard.jsx';
import NoMatch from './pages/NoMatch.jsx';
import { AuthLayout } from './layouts/AuthLayout.jsx';
import { AuthRequired } from './components/AuthRequired.jsx';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        element: <AuthRequired />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />
          },
        ]
      },
      {
        path: '*',
        element: <NoMatch />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
