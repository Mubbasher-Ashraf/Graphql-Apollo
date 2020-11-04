import { GraphQLObjectType, GraphQLSchema } from 'graphql';

// Query & Mutations
import userQuery from './query';

export default new GraphQLSchema({
     query: new GraphQLObjectType({
          name: 'RootQueryType',
          fields: {
               Login: userQuery.Login,
          }
     }),
     mutation: new GraphQLObjectType({
          name: 'RootMutationType',
          fields: {
               SignUP: userQuery.Sign,
          }
     })
});
