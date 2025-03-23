- To run the application, ensure that mongo express service is running and create a database called quizapp.

- Then in the root directory create a .env file and enter the following, 

MONGODB_URI=mongodb://admin:password@localhost:27017/quizapp?authSource=admin
JWT_SECRET= your_jwt_key
PORT=3000

- Replace your_jwt_key with he token that you get by running the following command, 

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))" 

- Now run, 
npm init -y
npm install express mongoose dotenv jsonwebtoken bcryptjs
npm install
npm run

- Navigate to http://localhost:3000/ and you would see the following text, 

Welcome to the Quiz App API! 

- Now install Postman
- To test the quiz app using Postman, you can use the following commands:

User Authentication
Register a new user:

Method: POST

URL: http://localhost:3000/api/auth/register

Body (JSON):

json
{
  "username": "testuser",
  "password": "testpassword"
}
Login:

Method: POST

URL: http://localhost:3000/api/auth/login

Body (JSON):

json
{
  "username": "testuser",
  "password": "testpassword"
}
Save the returned token for subsequent requests

Quiz Management
Create a new quiz:

Method: POST

URL: http://localhost:3000/api/quizzes

Headers: Add "x-auth-token" with the login token value

Body (JSON):

json
{
  "title": "Sample Quiz",
  "questions": [
    {
      "text": "What is 2+2?",
      "options": ["3", "4", "5"],
      "correctAnswer": 1
    }
  ]
}
ID: Save the quiz_id for use in the subsequest steps.
 
Get all quizzes:

Method: GET

URL: http://localhost:3000/api/quizzes

Headers: Add "x-auth-token" with the login token value

Get a specific quiz:

Method: GET

URL: http://localhost:3000/api/quizzes/{quiz_id}

Headers: Add "x-auth-token" with the login token value

Update a quiz:

Method: PUT

URL: http://localhost:3000/api/quizzes/{quiz_id}

Headers: Add "x-auth-token" with the login token value

Body (JSON): Include updated quiz details

Delete a quiz:

Method: DELETE

URL: http://localhost:3000/api/quizzes/{quiz_id}

Headers: Add "x-auth-token" with the login token value

Few considerations while running the application: 
- The app at this stage does not handle duplicate values during authentication.
- While running the GET commands, the app works as expected only when the body is not empty, so this has to be handled in the future.