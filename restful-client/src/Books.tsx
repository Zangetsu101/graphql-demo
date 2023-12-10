import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Book } from './types'

function Book({ book }: { book: Book }) {
  return (
    <Link to={`/books/${book.ISBN}`}>
      <img
        className="h-full w-full object-cover outline-zinc-400 hover:cursor-pointer hover:outline"
        src={book.image}
        alt={book.title}
      />
    </Link>
  )
}

function Books() {
  const [books, setBooks] = useState<Book[]>()

  useEffect(() => {
    fetch('http://localhost:3000/books', {})
      .then((res) => res.json())
      .then((books) => setBooks(books))
  }, [])

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 px-4 py-4 sm:grid-cols-4">
      {books?.map((book) => <Book key={book.ISBN} book={book} />)}
    </div>
  )
}

export default Books
