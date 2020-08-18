import Inquirer from 'inquirer';

const Prompt = function () {
     const question = [{
          type: 'input',
          name: 'Name',
          message: 'Whats your Name ?'
     }];

     Inquirer.prompt(question).then(answer => {
          console.log('answer', answer);

          const { Name } = answer;
          console.log(Name.length)
          if (Name && Name.length >= 3) {
               return true;
          } else {
               return false;
          }
     });
};

export default Prompt;
