import { useEffect, useState } from 'react'
import type { Author } from './types'
import { Link } from 'react-router-dom'

function Author({ author }: { author: Author }) {
  return (
    <Link className="text-blue-300 underline" to={`/authors/${author.id}`}>
      {author.name}
    </Link>
  )
}
function Authors() {
  const [authors, setAuthors] = useState<Author[]>()

  useEffect(() => {
    fetch('http://localhost:3000/authors', {})
      .then((res) => res.json())
      .then((books) => setAuthors(books))
  }, [])
  return (
    <ul className="mx-auto py-4 text-center">
      {authors?.map((author) => (
        <li className="mb-2 text-lg" key={author.id}>
          <Author author={author} />
        </li>
      ))}
    </ul>
  )
}

export default Authors
