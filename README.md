# Comparison of GraphqQL & Restful APIs

All the packages are using [bun](https://bun.sh/)

The restful package has the following endpoints:
- /books
- /books/:isbn
- /authors
- /authors/:authorId
- /authors/:authorId/books

The graphql server has the playground enabled & can
be accesed at `localhost:4000` after starting the
server

## Starting the servers
- restful -> `bun start`
- restful-client -> `bun dev`
- graphql -> `bun start`
- graphql-client -> `bun dev`
