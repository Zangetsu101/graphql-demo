import { gql, useQuery } from '@apollo/client'
import { Link, useMatch } from 'react-router-dom'

type Book = {
  ISBN: string
  title: string
  image: string
}

type Author = {
  id: string
  image: string
  name: string
  biography: string
  books: Book[]
}

const GET_AUTHOR = gql`
  query getAuthor($id: String!) {
    author(id: $id) {
      name
      image
      biography
      books {
        ISBN
        title
        image
      }
    }
  }
`

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
function BooksByAuthor({ books }: { books: Book[] }) {
  return (
    <div className="grid grid-cols-4 gap-x-1">
      {books.map((book) => (
        <Book key={book.ISBN} book={book} />
      ))}
    </div>
  )
}

function AuthorDetails() {
  const match = useMatch('authors/:id')
  const { data } = useQuery<{ author: Author }>(GET_AUTHOR, {
    variables: { id: match?.params.id }
  })

  const author = data?.author

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
          <BooksByAuthor books={author.books} />
        </div>
      </>
    )
  )
}

export default AuthorDetails
