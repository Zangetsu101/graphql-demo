import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

type Author = {
  id: string
  name: string
}

const GET_AUTHORS = gql`
  query getAuthors {
    authors {
      id
      name
    }
  }
`

function Author({ author }: { author: Author }) {
  return (
    <Link className="text-blue-300 underline" to={`/authors/${author.id}`}>
      {author.name}
    </Link>
  )
}
function Authors() {
  const { data } = useQuery<{ authors: Author[] }>(GET_AUTHORS)
  return (
    <ul className="mx-auto py-4 text-center">
      {data?.authors.map((author) => (
        <li className="mb-2 text-lg" key={author.id}>
          <Author author={author} />
        </li>
      ))}
    </ul>
  )
}

export default Authors
