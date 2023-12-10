import { useEffect, useState } from 'react'
import { Book } from './types'
import { Link, useMatch } from 'react-router-dom'

function BookDetails() {
  const match = useMatch('books/:isbn')
  const [book, setBook] = useState<Book>()

  useEffect(() => {
    fetch(`http://localhost:3000/books/${match?.params.isbn}`)
      .then((res) => res.json())
      .then((book) => setBook(book))
  }, [match?.params.isbn])

  return (
    book && (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-4">
        <img className="w-64" src={book.image} alt={book.title} />
        <div className="flex flex-col gap-2">
          <span>
            <b>Title:</b> {book.title}
          </span>
          <p>
            <b>Summary:</b> {book.summary}
          </p>
          <span className="self-end">
            By{' '}
            <Link
              className="text-blue-300 underline hover:cursor-pointer"
              to={`/authors/${book.authorId}`}
            >
              {book.author}
            </Link>
          </span>
        </div>
      </div>
    )
  )
}

export default BookDetails
