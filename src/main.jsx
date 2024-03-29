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
import Dashboard from './pages/user/DashboardPage/Dashboard.jsx';
import NoMatch from './pages/NoMatch.jsx';
import { AuthLayout } from './layouts/AuthLayout.jsx';
import { AuthRequired } from './components/AuthRequired.jsx';
import Books from './pages/user/MyBooksPage/Books.jsx';
import Friends from './pages/user/Friends.jsx';
import Stats from './pages/user/Stats.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import Profile from './pages/user/ProfilePage/Profile.jsx'
import Search from './pages/user/SearchBookPage/Search.jsx';
import AddBook from './pages/user/AddBookPage/AddBook.jsx';
import BookDetail from './pages/user/BookDetailPage/BookDetail.jsx';
import Favourites from './pages/user/FavouritesPage/Favourites.jsx';
import BookContextLayout from './layouts/BookContextLayout.jsx';
import Read from './pages/user/MyBooksPage/Read.jsx';
import Reading from './pages/user/MyBooksPage/Reading.jsx';
import ToRead from './pages/user/MyBooksPage/ToRead.jsx';
import About from './pages/user/About.jsx';
// import { ToastContainer } from 'react-toastify';

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
        children: [{
          element: <BookContextLayout />,
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
                  element: <Books />,
                  children: [
                    {
                      index: true,
                      element: <Read />
                    },
                    {
                      path: 'read',
                      element: <Read />
                    },
                    {
                      path: 'reading',
                      element: <Reading />
                    },
                    {
                      path: 'toread',
                      element: <ToRead />
                    },
                  ]
                },
                {
                  path: 'books/:id',
                  element: <BookDetail />
                },
                {
                  path: 'favourites',
                  element: <Favourites />
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
                {
                  path: '/about',
                  element: <About />
                },
              ]
            }
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
    {/* <ToastContainer autoClose={2000} bodyClassName={() => 'opacity-20'} /> */}
  </React.StrictMode>
)
