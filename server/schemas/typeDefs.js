const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  username: String!
  _id: ID!
  email: String!
  password: String!
  bookCount: Int
  savedBooks:[Book]
  }
  
  
  type Auth {
      token: ID!
      user: User
  }
      type Book {
          bookId: ID
          authors: [String]
          description: String
          title: String
          image: String
          link: String
      }
      input InputBook {
          bookId: String
          authors: [String]
          title: String
          description: String
          image: String
          link: String
      }
  
  
  
  type Query {
      me: User
      allUsers: [User]
     
  } 
  type Mutation {
      addUser(username: String!, email: String!, password: String!): Auth
      login(email: String!, password: String!): Auth
      savedBook(  input: InputBook): User
      removeBook( bookId: ID!): User
  }
`
module.exports = typeDefs;