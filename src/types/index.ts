export interface User {
  id: number
  login: string
  password: string
  name?: string
  bio?: string
}

export interface Book {
  id: number
  title: string
  summary: string
}

export interface Review {
  id: number
  text: string
  book_id: number
  user_id: number
}
