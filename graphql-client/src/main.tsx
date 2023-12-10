import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Books from './Books.tsx'
import Authors from './Authors.tsx'
import BookDetails from './BookDetails.tsx'
import AuthorDetails from './AuthorDetails.tsx'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
})

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
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
)
