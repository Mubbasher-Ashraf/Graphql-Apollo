import {
     GraphQLString, GraphQLObjectType,
     GraphQLInt, GraphQLNonNull, GraphQLID, GraphQLBoolean
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

export const getToken = new GraphQLObjectType({
     name: 'User_Token',
     description: 'User Login',
     fields: () => ({
          _id: {
               type: GraphQLID,
               description: '_id'
          },
          id: {
               type: GraphQLID,
               description: 'id'
          },
          first_name: {
               type: GraphQLString,
               description: 'Fn'
          },
          last_name: {
               type: GraphQLString,
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
          dob: {
               type: GraphQLString,
               description: 'dob'
          },
          email: {
               type: GraphQLString,
               description: 'Email'
          },
          profile_pic: {
               type: GraphQLString,
               description: 'Profile Picture'
          },
          gender: {
               type: GraphQLString,
               description: 'gd'
          },
          email_verified: {
               type: GraphQLBoolean,
               description: 'em-v'
          },
          suspended: {
               type: GraphQLBoolean,
               description: 'susp'
          },
          verified_number: {
               type: GraphQLBoolean,
               description: 'ver-num'
          },
          Token: {
               type: GraphQLString,
               description: 'User Token'
          },
     })
});
export default SignUp;