import app from './config/express';
import mongoose from './config/mongoose';
import config from './config/config';
import chalk from 'chalk';

const { SERVER_HOST, SERVER_PORT } = config.value;
app.listen(SERVER_PORT, () => {
     console.log(chalk.yellowBright(`SERVER RUNNING ON ${SERVER_HOST}:${SERVER_PORT}`));
});

// Catch unhandled exceptions & rejections Later.....