import { graphqlHTTP } from 'express-graphql';
// import { graphqlUploadExpress } from 'graphql-upload';
// import { getRootValue } from '../middleware';
// import protectedSchema from '../GraphQL/private';
import publicSchema from '../GraphQL/public';

export default function (app) {
     //public graphql endpoint
     app.use("/api/auth", graphqlHTTP(async (request, response, graphQLParams) => ({
          schema: publicSchema,
          pretty: true,
          graphiql: true,
          customFormatErrorFn: error => ({
               message: error.message,
               locations: error.locations,
               path: error.path,
               stack: error.stack ? error.stack.split('\n') : []
          })
     })),
     );
     //private graphql endpoint
}