# JWT Authentication Server

The project is a ready example of using Express with mongo db to create authentication back-end, this back-end use JWT to issue tokens to be used in resource server.

Github repository link https://github.com/moaaz-nashawi/auth-server

full documentation and API manual is available http://syrmedia.com/moaaz/docs/

## Features:

- local Signup mechanism ( SignUp - SignOut - Login ).
- Social Login mechanism with Facebook & Google Enabled.
- JWT tokens: issues tokens after login to be used with resource server.

## Installation

- Clone the github repository https://github.com/moaaz-nashawi/auth-server

  `git clone`

- open the terminal inside the cloned folder and run

  `npm install`

- open the .env file in project root directory and fill all the variables

## Usage

- open the terminal in the project folder and run

`npm start`

- now the server is running, your next step is to setup a Front-End app to communicate with the Api endpoint or you can use (PostMan,Curl...etc) to test it, read the documentation and the api manual here to fully understand the project

- **Available endpoints:**
  - /api/v1/signup
    receive the user information and add it to the db
  - /api/v1/login receive the user email & password and login the user
  - /api/v1/signout receive the refresh token & sign it out
  - /api/v1/userinfo return the user object
  - /api/v1/checktoken check if the refresh token is valid
  - /api/v1/newtoken generate new access token
  - /api/v1/auth/facebook authenticate using Google, you can only use this api with Front-End interface, not normal api request !
  - /api/v1/auth/google authenticate using Facebook, you can only use this api with Front-End interface, not normal api request !

## Real life usage scenario

- the auth sever (this project) is running on port 4000
- create resource server using node and express and use the same jwt secret keys in-order to use the generated tokens of auth server, the resource server is running on port 3000
- create React app to consume the backend endpoints.

- life cycle
  - React app send signup post request to the auth server
  - the auth server create the user and add it to the db
  - React app send login request to the auth server
  - the auth server response with access & refresh token
  - React app use the provided access token to send requests to resource server

full documentation and API manual is available http://syrmedia.com/moaaz/docs/
