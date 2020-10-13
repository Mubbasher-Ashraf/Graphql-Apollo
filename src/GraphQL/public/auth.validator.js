import Validator from 'validator'; //, equals, contains
import { isEmpty } from 'underscore';

export const signUpValidator = async (data) => {
     const error = {};

     if (Validator.isEmpty(data.email)) {
          error.field = 'email required field';
      }
     if (Validator.isEmpty(data.first_name) || data.first_name.length < 5) { 
          error.field = 'first_name required field';
     }
     if (Validator.isEmpty(data.last_name) || data.last_name.length < 5) { 
          error.field = 'last_name required field';
     }
     if (Validator.isEmpty(data.password)) {
          error.field = 'password required field';
     }
     if (data.password.length < 8) {
          error.field = 'password Length must be of min: 8 characters!';
     }
     return {
          isEmpty: isEmpty(error),
          error
     };
};

// export default signUpValidator;