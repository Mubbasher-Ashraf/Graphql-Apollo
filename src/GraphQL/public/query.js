import {
     GraphQLString, GraphQLNonNull, GraphQLInt
} from 'graphql';
import mongoose from 'mongoose';
const User = mongoose.model('User');

import SignUp, { getToken } from './type';

let userDetail = {
     Sign: {
          type: SignUp,
          description: 'User detail for SignUp',
          args: {
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
          },
          resolve: async (root, args) => {
               console.log('root', root);
               console.log('data', args);
               return args;
          }
     },
     Login: {
          type: getToken,
          description: 'User Auth Token',
          args: {
               identifier: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'User Identifier (Username/email)'
               },
               password: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'User Password'
               }
          },
          resolve: async (_, args) => {
               console.log('User Login Successfully', args);
               return true;
          }
     }
};

export default userDetail;