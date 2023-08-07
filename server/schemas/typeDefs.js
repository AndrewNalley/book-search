const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    authors: String
    description: String
    bookId: String
    title: String
    image: String
    link: String
  }
  input SavedBookInput {
    authors: [String]
    description: String
    bookId: String
    title: String
    image: String
    link: String
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: SavedBookInput): User
    removeBook(bookId: String!): User
  }
  type Auth {
    token: ID!
    user: User
  }
`
module.exports = typeDefs;