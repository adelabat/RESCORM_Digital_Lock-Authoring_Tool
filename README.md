# Rescorm_Digital-Lock_Generator

## Installation
1. Previous requirements:
    * A computer with internet connection.
    * Operative cmd/Konsole.
2. Install [node.js](https://nodejs.org/es/download/) and [git](https://git-scm.com/downloads).
3. Open a new terminal, go to your working directory and clone this GitHub poject:
    ```bash
    git clone https://github.com/adelabat/Rescorm_Digital-Lock_Generator
    ```
4. Go to the 'Rescorm_Digital-Lock_Generator' folder that has been created.
5. Execute the following command to install all the project dependencies in the 'node_modules' folder:
    ```bash
    npm install
    ```
6. Execute the following command to start the development server:
    ```bash
    npm start
    ```
    The app will be available at the following URL [http://localhost:3000](http://localhost:3000).  
    
7. Once you had configurated your app, just click on the button 'download' to have your app in a scorm package locally. 

8. Development server can be stopped by pressing 'Ctrl-C'.
9. Configuration can be specified in:  
    * src/config/Config.js: Global configuration to customize the React application.  
    

## Available commands
### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br>
You will also see any lint errors in the console.
### `npm test`
Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
### `npm run build`
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Available Configuration
#### * title,
The name of your app .
#### * showUsername,
Allows showing or not the username .
#### * timeout,
Allows setting a time limit.
####  * mode,
Allows choosing one of the five different game modes.
* Symbol/Alphanumeric
* CombinationLock/PadLock
* Pattern
#### * theme,
Allows choosing one of the different [bootwatch themes](https://bootswatch.com/).
#### * tip,
A small text giving some useful information.
#### * escapp,
Allows using [escapp](https://escapp.dit.upm.es/) for monitoring puzzle´s answer, time and puntuation.
#### * puzzleId,
#### * escapeRoomId,
#### * puzzleLength,
Configuration of escapp parameters.
#### * answer,
If you´re not using [escapp](https://escapp.dit.upm.es/), this allows setting puzzles´s answer.
#### * Success Message,
A small text in case the correct answer was given.
#### * Fail Message,
A small text in case the wrong answer was given.
#### * ScormVersion,
* "1.2"
* "2004"
      
## * Features
- [x] SCORM 1.2 and SCORM 2004 4th Editon support
- [x] ECMAScript 6 and JSX support
- [x] React 16.0.0
- [x] React Router v4
- [x] Redux
- [x] Webpack (v.3.6.0) and Webpack Dev Server (v.2.8.2)
- [x] Hot Module Replacement using [react-hot-loader](https://github.com/gaearon/react-hot-loader)
- [x] ES6 linting with continuous linting on file change
- [x] Separate CSS stylesheets generation
- [x] SASS support
- [x] Export Separate Vendor Files      

## * Learn More
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).
