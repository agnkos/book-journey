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
import Books from './pages/user/MyBooksPage/Books.jsx';
import Friends from './pages/user/Friends.jsx';
import Stats from './pages/user/Stats.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import Profile from './pages/user/Profile.jsx'
import Search from './pages/user/SearchBookPage/Search.jsx';
import AddBook from './pages/user/AddBookPage/AddBook.jsx';

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
            element: <DashboardLayout />,
            children: [
              {
                path: '/dashboard',
                element: <Dashboard />
              },
              {
                path: '/books',
                element: <Books />
              },
              {
                path: '/search',
                element: <Search />
              },
              {
                path: '/friends',
                element: <Friends />
              },
              {
                path: '/stats',
                element: <Stats />
              },
              {
                path: '/addbook',
                element: <AddBook />
              },
              {
                path: '/profile',
                element: <Profile />
              },
            ]
          }
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
