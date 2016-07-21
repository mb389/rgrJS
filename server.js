import express from 'express'
import {MongoClient} from 'mongodb'
import env from './.env'
import GraphQLHTTP from 'express-graphql'
import schema from './data/schema'

let app = express()

app.use(express.static('public'))


let db;
MongoClient.connect(env.MONGO_URL,(err,database) => {
  if (err) throw err;

  db = database;

  app.use('/graphql',GraphQLHTTP({
      schema: schema(db),
      graphiql: true
  }))

  app.listen(3000, () => console.log("Listening on 3000"))


})

// app.get('/data/links', (req,res) => {
//   db.collection("links")
//   .find({}).toArray((err, links) => {
//     if (err) throw err;
//     res.json(links)
//   })
// })