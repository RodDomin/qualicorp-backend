import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Neo4JConnection } from './database/neo4j/Neo4JConnection';
import { routes } from './routes';

const app = express();
const database = new Neo4JConnection();

database.connect();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200).json({})
    }
    next()
  })
app.use(express.json());
app.use('/api/users', routes(database));

const port = process.env.PORT ?? 3333;

app.listen(port, () => console.log('Server started at: ' + port));

