import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Neo4JConnection } from './database/neo4j/Neo4JConnection';
import { routes } from './routes';

const app = express();
const database = new Neo4JConnection();

database.connect();

app.use(cors());
app.use(express.json());
app.use('/users', routes(database));

const port = process.env.PORT ?? 3333;

app.listen(port, () => console.log('Server started at: ' + port));

