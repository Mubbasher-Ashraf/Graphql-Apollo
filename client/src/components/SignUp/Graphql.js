// import gql from 'graphql-tag';
import { gql } from '@apollo/client';

export const User_Sign_Up = gql`
    mutation UserSignUp($email: String!, $password: String! ) { 
        SignUP(email: $email, password: $password,
            first_name: "Mubbasher1122", last_name: "Bhatti") {
            email
            first_name
            last_name
        }
    }
`;

export const User_Login = gql`
    query UserLogin($identifier: String!, $password: String!) {
        Login(identifier: $identifier, password: $password) {
            first_name
            email
            Token
        }
    }
`;
