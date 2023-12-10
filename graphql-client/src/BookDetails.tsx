import { Link, useMatch } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

type Book = {
  title: string
  summary: string
  image: string
  author: {
    id: string
    name: string
  }
}

const GET_BOOK = gql`
  query getBook($isbn: String!) {
    book(isbn: $isbn) {
      title
      summary
      image
      author {
        id
        name
      }
    }
  }
`

function BookDetails() {
  const match = useMatch('books/:isbn')
  const { data } = useQuery<{ book: Book }>(GET_BOOK, {
    variables: { isbn: match?.params.isbn }
  })

  const book = data?.book

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
              to={`/authors/${book.author.id}`}
            >
              {book.author.name}
            </Link>
          </span>
        </div>
      </div>
    )
  )
}

export default BookDetails
