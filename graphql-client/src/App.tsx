import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <nav className="flex justify-center gap-4 bg-zinc-400 text-lg">
        <Link to="books" className="p-1 text-white hover:cursor-pointer">
          Books
        </Link>
        <Link to="authors" className="p-1 text-white hover:cursor-pointer">
          Authors
        </Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
