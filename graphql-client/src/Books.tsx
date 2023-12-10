import { Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

type Book = { ISBN: string; image: string; title: string }

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

const GET_BOOKS = gql`
  query getBooks {
    books {
      ISBN
      image
      title
    }
  }
`

function Books() {
  const { data } = useQuery<{ books: Book[] }>(GET_BOOKS)

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 px-4 py-4 sm:grid-cols-4">
      {data?.books.map((book) => <Book key={book.ISBN} book={book} />)}
    </div>
  )
}

export default Books
