import {
     GraphQLString, GraphQLNonNull, GraphQLInt
} from 'graphql';
import mongoose from 'mongoose';
const User = mongoose.model('User');
import { signUpValidator, loginValidator } from './auth.validator';
import { createUser, Login } from './userController';
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
          resolve: async (_, args) => {
               let { error, isEmpty } = await signUpValidator(args);
               if (!isEmpty) {
				throw new Error(JSON.stringify(error));
               }
               return createUser(args);
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
               const { error, isEmpty } = await loginValidator(args);
               if (!isEmpty) {
				throw new Error(JSON.stringify(error));
               }
               return Login(args);
          }
     }
};

export default userDetail;