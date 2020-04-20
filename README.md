# RESCORM Digital Lock - Authoring Tool

By: [@adelabat](http://github.com/adelabat)

This web application provides a web form to easily set up the [RESCORM Digital Lock app](http://github.com/adelabat/TFG). It allows to specify all the different fields that are included in the `config.js` file of said application without a need to build the application.
By filling in the fields of the web form and clicking the download button, you can have your SCORM-compliant digital lock ready to deploy in your favorite learning managament system (LMS).


## Installation
1. Install [node.js](https://nodejs.org/es/download/) and [git](https://git-scm.com/downloads).
2. Open a new terminal, go to your working directory and clone this GitHub poject:
    ```bash
    git clone https://github.com/adelabat/RESCORM_Digital_Lock-Authoring_Tool
    cd RESCORM_Digital_Lock-Authoring_Tool
    ```
3. Execute the following command to install all the project dependencies in the 'node_modules' folder:
    ```bash
    npm install
    ```
4. Execute the following command to start the development server:
    ```bash
    npm start
    ```
    The app will be available at the following URL [http://localhost:3000](http://localhost:3000).  
    
5. Development server can be stopped by pressing 'Ctrl-C'.

## Building for production

To build the application for production simply run the `npm run build` command. The output will be placed in the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
