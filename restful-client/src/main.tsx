import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Books from './Books.tsx'
import Authors from './Authors.tsx'
import BookDetails from './BookDetails.tsx'
import AuthorDetails from './AuthorDetails.tsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Books />
      },
      {
        path: '/books',
        element: <Books />
      },
      {
        path: '/books/:isbn',
        element: <BookDetails />
      },
      {
        path: '/authors',
        element: <Authors />
      },
      {
        path: '/authors/:id',
        element: <AuthorDetails />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
