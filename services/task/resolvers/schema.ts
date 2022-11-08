import { gql } from 'apollo-server'
import { Kind } from 'graphql';

export const typeDefs = gql`
  type Task {
    id: Int!
    title: String!
    completed: Boolean
    position: Int 
    list: List
  }

  type List {
    id: Int!
    title: String!
    creator: User
  }

  type User {
    id: ID
    username: String
  }

  input CreateTaskInput {
    title: String!
    listId: Int!
  }

  input UpdateTaskInput {
    title: String
    status: Boolean
  }

  type MutationResult {
    success: Boolean!
  }

  type Query {
    tasks: [Task!]!
    task(id: Int!): Task
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
    updateTask(id: Int!, input: UpdateTaskInput!): Task
    moveTaskToPosition(position: Int!, taskId: Int!): Task
    deleteTask(id: Int!): MutationResult!
  }
`
