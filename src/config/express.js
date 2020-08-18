import express from 'express';
import fs from 'fs';
import http from 'http';
import helmet from 'helmet';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import graphql from './graphql';
// import chalk from 'chalk';
import { graphqlHTTP } from 'express-graphql';
import publicSchema from '../GraphQL/public';

const app = express();

try {
     fs.existsSync(path.join(__dirname, '../../public') || fs.mkdirSync(path.join(__dirname, '/../../public')));
     fs.existsSync(path.join(__dirname, '/../../public/uploads')) || fs.mkdirSync(path.join(__dirname, '/../../public/uploads'));
} catch (error) {
     throw new Error(`Error while creating directories: ${error.message}`);
}

app.use(favicon(path.join(__dirname, '../../public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '/../../public')));

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const server = http.createServer(app);
graphql(app);

export default app;
