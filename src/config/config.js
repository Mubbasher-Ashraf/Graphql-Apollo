import Joi from '@hapi/joi';
// require and configure dotenv, will load vars in .env in process.env
require('dotenv').config();

const Schema = Joi.object({
     NODE_ENV: Joi.string()
          // .allow(['development', 'production', 'test'])
          .default('development'),
     APP_NAME: Joi.string()
          .default('GraphQL with Node js & Apollo with React js'),
     APP_VERSION: Joi.string()
          .default('1.0'),
     //Server Credentials
     SERVER_HOST: Joi.string().default('127.0.0.1'),
     SERVER_PORT: Joi.number().required().default(8080),
     RESET_PASSWORD_SECRET: Joi.string().required().description('Email Confirmation Secret required to SignIn'),

     MONGO_DB_URL: Joi.string().required().description('Mongo db connection url'),

}).required();

const envVars = Schema.validate(process.env);

export default envVars;