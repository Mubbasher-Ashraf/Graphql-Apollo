import mongoose, { mongo } from 'mongoose';
import config from './config';
import chalk from 'chalk';
import '../models';

const connected = chalk.bold.cyanBright;
const Error = chalk.bold.redBright;
const disconnected = chalk.bold.redBright;
const termination = chalk.bold.magenta;


const options = {
     useUnifiedTopology: true,
     useNewUrlParser: true,
     // keepAlive: true, default true
     useCreateIndex: true,
     // poolSize: 10, //default 5
     // serverSelectionTimeoutMS: 5000,
     // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

const connect = mongoose.connection;

mongoose.connect(config.value.MONGO_DB_URL, options);


connect.once('open', () => {
     console.log(connected('Connection Established With DB Successfully At....', config.value.MONGO_DB_URL));
});

connect.on('error', (error) => {
     console.log(Error('error while connection....', error));
     process.exit(0);

});

connect.on('disconnected', (error) => {
     console.log(disconnected('Disconnected Successfully due to ', error));
});

process.on('SIGINT', () => {
     mongoose.connection.close(() => {
          console.log(termination('DB Connection Close due to Application termination'));
          process.exit(0);
     });
});

process.on('SIGTERM', () => {
     mongoose.connection.close(() => {
          console.log(termination('DB Connection Close Due to Application termination'));
     });
});
