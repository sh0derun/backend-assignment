import { gql } from 'apollo-server'
import { Kind } from 'graphql';

export const typeDefs = gql`
  type List {
    id: Int!
    title: String!
    creator: User
  }

  type ListwithTasks {
    id: Int!
    title: String!
    creator: User
    tasks: [Task!]
  }

  type User {
    id: ID
    username: String
    lists: [List!]
  }

  type Task {
    id: Int!
    title: String!
    completed: Boolean
    position: Int 
  }

  input CreateListInput {
    title: String!
    userId: ID!
  }

  input UpdateListInput {
    title: String
  }

  type MutationResult {
    success: Boolean!
  }

  type Query {
    lists: [List!]!
    listsWithTasks: [ListwithTasks!]!
    list(id: Int!): List
  }

  type Mutation {
    createList(input: CreateListInput!): List!
    updateList(id: Int!, input: UpdateListInput!): List
    deleteList(id: Int!): MutationResult!
  }
`
