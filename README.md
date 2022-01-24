# RESTful Node.js Starter with Prisma and Typescript

This is an entity-based (**atom**) starter that utilizing

1. Typescript
2. Prisma (ORM)
3. Eslint
4. Jest
5. Casl
6. Husky

## So what is an atom

An atom is a single part of the project, atoms can work together to response to certain requests

![Atoms](https://user-images.githubusercontent.com/75932114/137381027-5286706d-a759-4467-907e-c5efc715c9a9.png)

## The core components of an atom are

1. Schemas
2. Service
3. Controller
4. Router

### Schemas

Schemas are zod schemas that used to validate the incoming data

### Service

A service is an API between a atom and the database

### Controller

A controller control the logic of a atom, a controller may need **schemas** and/or **service**

### Router

A router routes traffic to the desired function

## Other files may be provided such as

1. Tests
2. Types
3. Helpers

## CLI

1. `npm run initialize` for initialization this command will
   1. delete **LICENSE** and **CONTRIBUTING.md** files
   2. empty **README.md** file
   3. delete **.env.example** and copy its content to **.env**
   4. ask you for project **Name**, **Version**, **Description** and **Author** and write them to package.json
2. `npm run make atom <name>` to make a new atom
3. `npm run make atom <name> -crud` to make a new CRUD atom
4. `npm run make root-user` to make root user (role=ROOT)
