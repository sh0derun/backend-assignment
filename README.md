# Brikl backend engineer assignment

## Introducing the Alpha

Alpha is the new startup company we are developing a cutting edge task management system with modern technology.

## Functionality

### Task management

- Create a new list via the mutation `createList` that takes as an input `CreateListInput` that includes `title` and `userId` and it returns `List` that includes `id`, `title` of the created list and `creator` which is user that creates the list. Here are graphQL types respectively.
  
  - `List` type  
    ```graphql
    type List {
      id: Int!
      title: String!
      creator: User
    }
    ```  

  - `createList` mutation call:
    ```graphql  
    mutation {
      createList(input: {
        title: "todo",
        userId: "54861299-75de-4fe7-8982-79f55bf127ad",
      }) {
        id,
        title,
        creator{
          id
        }
      }
    }
    ```
- Create a new task in a list (the task should be prepended to the list and the
  status should indicate it has not been completed) via the mutation `createTask` that takes as an input `CreateTaskInput` that includes `title` of task and `listId` that will belongs to. Mutation will return `Task` type that was persisted in database.

  - `Task` type  
    ```graphql
    type Task {
      id: Int!
      title: String!
      completed: Boolean
      position: Int 
      list: List
    }
    ```

  - `createTask` mutation call:
    ```graphql  
    mutation {
      createTask(input: {
        title: "init db schema",
        listId: 1,
      }) {
        id,
        title,
        completed,
        position,
        list{
          id
        }
      }
    }
    ```
- Update a task (title and status) via mutation `updateTask` that takes as an input `id` of the task and `UpdateTaskInput` that holds new `title` and `status` of the task> Mutation will return `Task` that with updated fields.
  - `updateTask` mutation call:
    ```graphql  
    mutation {
      updateTask(input: {
        title: "init db schema",
        status: true,
      }) {
        id,
        title,
        completed
      }
    }
    ```
- Delete a task or list via mutation `deleteList` and `deleteTask` with `id` as argument, and returns deleted `Task`.
- Move a task to a specific position in the list via mutation `moveTaskToPosition` that takes `position` new task posistion and `taskId`, and returns `Task` with updated position.
- Retrieve all lists and their tasks via query `listsWithTasks`, and it will return all lists with their tasks.
  - `listsWithTasks` query call:
    ```graphql  
    query{
        listsWithTasks{
            id,
            title,
            creator {
                id,
                username
            },
            tasks {
                title,
                completed,
                position
            }
        }
    }
    ```
  - Result of the query:
    ```json
    {
      "data": {
        "listsWithTasks": [
          {
            "id": 1,
            "title": "todo",
            "creator": null,
            "tasks": [
              {
                "title": "init bd schema",
                "completed": false,
                "position": 0
              },
              {
                "title": "init graphQL schema",
                "completed": false,
                "position": 0
              },
              {
                "title": "init code schema",
                "completed": false,
                "position": 0
              }
            ]
          }
        ]
      }
    }
    ```

## Getting start

- [Prerequisites](#prerequisites)
- [Setup](#setup)

### Prerequisites

Make sure you have these tools installed

- Docker
- Node.js
- Node package manager, preferably `pnpm`

### Setup

This is the instruction to setup this project and run in your local machine. Note that this instruction uses `pnpm` as a package manager. You may replace these commands corresponding to your package manager.


1. Install dependencies.
2. Run `docker compose up -d` to start docker containers in background.
3. Run `pnpm db:migrate` to initiate database.
4. Run `pnpm codegen` to generate TypeScript definition for GraphQL and Prisma client.
5. Run `pnpm start` to start the project.
6. Go to `http://localhost:4000`, you should see Apollo Playground with several queries. You may change the port according to `GATEWAY_PORT` in your `.env` file. You may change ports of the other microservices servers `USER_SERVICE_PORT`, `LIST_SERVICE_PORT` or `TASK_SERVICE_PORT`
