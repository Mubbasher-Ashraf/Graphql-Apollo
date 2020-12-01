import app from './config/express';
// import Cluster from 'cluster';
// import OS from 'os';
import config from './config/config';
import chalk from 'chalk';

// const numCPUs = OS.cpus().length;
// if (Cluster.isMaster) {
//      for (var i = 0; i < numCPUs; i++) {
//           Cluster.fork();
//      }
//      Cluster.on('exit', (worker, code, signal) => {
//           console.log(`worker ${worker.process.pid} died`);
//      });
// } else {
     const { SERVER_HOST, SERVER_PORT } = config.value;
     app.listen(SERVER_PORT, () => {
          console.log(chalk.white(`SERVER RUNNING ON ${SERVER_HOST}:${SERVER_PORT}`));
     });
// }

// Catch unhandled exceptions & rejections Later.....