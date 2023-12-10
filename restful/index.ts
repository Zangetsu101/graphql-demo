import { authors } from './authors'
import { books } from './books'

function BookHandler(url: URL) {
  if (url.pathname === '/books') {
    return new Response(JSON.stringify(books))
  }

  if (!url.pathname.match(/\/books\/[0-9]+$/)) {
    return undefined
  }

  const urlIsbn = url.pathname.split('/').at(2)!
  const book = books.find((b) => b.ISBN === urlIsbn)

  if (!book) {
    return undefined
  }
  return new Response(JSON.stringify(book))
}

function AuthorHandler(url: URL) {
  if (url.pathname === '/authors') {
    return new Response(JSON.stringify(authors))
  }

  if (!url.pathname.match(/\/authors\/[0-9]+(\/books)?$/)) {
    return undefined
  }

  const urlAuthorId = url.pathname.split('/').at(2)!
  const author = authors.find((a) => a.id === urlAuthorId)

  if (!author) {
    return undefined
  }

  if (url.pathname.endsWith('/books')) {
    return new Response(
      JSON.stringify(books.filter((book) => book.authorId === urlAuthorId))
    )
  }
  return new Response(JSON.stringify(author))
}

const server = Bun.serve({
  fetch(req) {
    const url = new URL(req.url)

    const response = BookHandler(url) ?? AuthorHandler(url)

    if (response !== undefined) {
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
      )
    }
    return response ?? new Response('404!', { status: 404 })
  }
})

console.log(`Listening on http://localhost:${server.port} ...`)
