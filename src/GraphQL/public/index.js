import { GraphQLObjectType, GraphQLSchema } from 'graphql';

// Query & Mutations
import userQuery from './query';

export default new GraphQLSchema({
     query: new GraphQLObjectType({
          name: 'RootQueryType',
          fields: {
               SignUP: userQuery.Sign,
               Login: userQuery.Login,
          }
     })
});
