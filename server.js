import express from 'express'
import fs from 'fs'
import {MongoClient} from 'mongodb'
import env from './.env'
import GraphQLHTTP from 'express-graphql'
import Schema from './data/schema'
import {graphql} from 'graphql'
import {introspectionQuery} from 'graphql/utilities'

let app = express()

app.use(express.static('public'))

// (async () = > {
//   let db = await MongoClient.connect(env.MONGO_URL)
//     app.use('/graphql',GraphQLHTTP({
//         schema: schema(db),
//         graphiql: true
//     }))
//
//     app.listen(3000, () => console.log("Listening on 3000"))
// })()

let db;
MongoClient.connect(env.MONGO_URL,(err,database) => {
  if (err) throw err;

  db = database;

  let schema = Schema(db)

  app.use('/graphql',GraphQLHTTP({
      schema,
      graphiql: true
  }))

  app.listen(3000, () => console.log("Listening on 3000"))

  // Generate schema.json

  graphql(schema,introspectionQuery)
  .then(json => {
    fs.writeFile('./data/schema.json',JSON.stringify(json,null,2), err => {
      if (err) throw err;
      console.log("JSON schema created")
    })
  })



})
