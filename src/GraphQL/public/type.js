import {
     GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLNonNull
} from 'graphql';

let SignUp = new GraphQLObjectType({
     name: 'User',
     description: 'User SignUp',
     fields: () => ({
          first_name: {
               type: new GraphQLNonNull(GraphQLString),
               description: 'Fn'
          },
          last_name: {
               type: new GraphQLNonNull(GraphQLString),
               description: 'Ls'
          },
          nick_name: {
               type: GraphQLString,
               description: 'Nn'
          },
          age: {
               type: GraphQLInt,
               description: 'Age'
          },
          email: {
               type: new GraphQLNonNull(GraphQLString),
               description: 'Email'
          },
          password: {
               type: new GraphQLNonNull(GraphQLString),
               description: 'Password'
          }
     })
});

export default SignUp;