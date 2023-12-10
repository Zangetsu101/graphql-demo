export type Book = {
  ISBN: number
  title: string
  author: string
  authorId: string
  summary: string
  image: string
  price: {
    currency: string
    value: number
    displayValue: string
  }
}

export type Author = {
  id: string
  name: string
  biography: string
  image: string
}
