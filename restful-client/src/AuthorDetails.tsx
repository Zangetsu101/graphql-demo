import { useEffect, useState } from 'react'
import type { Author, Book } from './types'
import { Link, useMatch } from 'react-router-dom'

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
function BooksByAuthor({ authorId }: { authorId: string }) {
  const [books, setBooks] = useState<Book[]>()

  useEffect(() => {
    fetch(`http://localhost:3000/authors/${authorId}/books`, {})
      .then((res) => res.json())
      .then((books) => setBooks(books))
  }, [authorId])

  return (
    <div className="grid grid-cols-4 gap-x-1">
      {books?.map((book) => <Book key={book.ISBN} book={book} />)}
    </div>
  )
}

function AuthorDetails() {
  const match = useMatch('authors/:id')
  const [author, setAuthor] = useState<Author>()

  useEffect(() => {
    fetch(`http://localhost:3000/authors/${match?.params.id}`)
      .then((res) => res.json())
      .then((author) => setAuthor(author))
  }, [match?.params.id])

  return (
    author && (
      <>
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-4">
          <img className="w-64" src={author.image} alt={author.name} />
          <div className="flex flex-col gap-2">
            <span>
              <b>Name:</b> {author.name}
            </span>
            <p>
              <b>Biography:</b> {author.biography}
            </p>
            <b>From the author:</b>
          </div>
          <BooksByAuthor authorId={author.id} />
        </div>
      </>
    )
  )
}

export default AuthorDetails
