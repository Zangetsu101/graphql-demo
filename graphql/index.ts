import { authors } from './authors'
import { books } from './books'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `#graphql
  type Author {
    id: String
    name: String
    biography: String
    image: String
    books: [Book]
  }

  type Price {
    currency: String
    value: Int
    displayValue: String
  }

  type Book {
    ISBN: String
    title: String
    author: Author
    summary: String
    image: String
    price: Price
  }

  type Query {
    books: [Book]
    authors: [Author]
  }
`

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors
  },
  Book: {
    author: (book: (typeof books)[number]) =>
      authors.find((a) => a.id === book.authorId)
  },
  Author: {
    books: (author: (typeof authors)[number]) =>
      books.filter((b) => b.authorId === author.id)
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log(`🚀  Server ready at: ${url}`)
