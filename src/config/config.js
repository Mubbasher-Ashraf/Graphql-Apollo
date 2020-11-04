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
     RESET_PASSWORD_SECRET: Joi.string().required().description('Password Reset Secret required'),

     MONGO_DB_URL: Joi.string().required().description('Mongo db connection url Required'),

     JWT_SECRET: Joi.string().required().description('Jwt Secret Required'),

     DEFAULT_IMAGE_URL: Joi.string(),
     CLOUDINARY_URL: Joi.string().required().description('Cloudinary Image storage URL required'),
     
     CAPTCHA_SITE_KEY: Joi.string().required().description('Captcha Site Key is required')
}).required();

const envVars = Schema.validate(process.env);

export default envVars;