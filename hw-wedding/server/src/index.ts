import express, { Express } from "express";
import { add, load, names } from './routes';
import bodyParser from 'body-parser';


// Configure and start the HTTP server.
const port: number = 8088;
const app: Express = express();
app.use(bodyParser.json());
app.post('/api/add', add);
app.get('/api/load', load);
app.get('/api/names', names);
app.listen(port, () => console.log(`Server listening on ${port}`));
