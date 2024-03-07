kill -9 $(lsof -t -i:3003)
4.1 
    Turn the application into a functioning npm project. To keep your development productive, configure the application to be executed with nodemon. You can create a new database for your application with MongoDB Atlas, or use the same database from the previous part's exercises.

    Verify that it is possible to add blogs to the list with Postman or the VS Code REST client and that the application returns the added blogs at the correct endpoint.

notes:
changed directory structure to adhere to Node.js best practices!

added blank file app.js

Separated all printing to utils/logger.js

Separated handling of environment variables to utils/config.js

Other parts of application can access environment variables by importing the configuration model!
    ADDED THIS TO controllers/notes.js, models/person.js, utils/middleware.js and index.js
    const config = require('./utils/config')

    logger.info(`Server running on port ${config.PORT}`)

Simplify index.js -> old code commented!

controller/notes.js contents used like from course material! Almost copy paste of index.js!

CONFIGURE THIS! Come back here to make changes! Old index.js to controller/notes.js, maybe change name to persons.js or people.js!
    Also app.delete('/api/notes/:id', (request, response, next) => { 
    changes to 
    notesRouter.delete('/:id', (request, response, next) => {

app.js contents from course material CONFIGURE THIS TO MY PROGRAM!

utils/middleware.js from course material CONFIGURE THIS TO MY PROGRAM!

person.js old code commented and added course material for note.js CONFIGURE TO MY PROGRAM!

Use first method for logger! CONFIGURE TO MY PROGRAM!
    const logger = require('./utils/logger')

    logger.info('message')

    logger.error('error message')

If you're having issues with content.body being undefined for seemingly no reason, make sure you didn't forget to add app.use(express.json()) near the top of the file.

TODO:
4.1 Turn into NPM project
    - npm install --save-dev nodemon
    - update package.json "scripts" to
        "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js"
        }
    - npm run dev
    - check package.json that correct name and "main" is index.js!
    -Verify that it is possible to add blogs to the list with Postman or the VS Code REST client and that the application returns the added blogs at the correct endpoint.

Tasks:    
    - Comment refactored index.js code. and uncomment 4.1 code. DONE
    - do my todo ! npm install done. nodemon index.js correct. Start is nodemon index.js, probably correct change it anyway to node. dev is correct. Changed main to index.js from appBody.js!
    - run npm run dev, I have problems. -> npm install dotenv, require('dotenv').config() to top of my index.js! Logger not defined -> add const logger = require('./utils/logger') to index.js
    - new problem Error with mongoDB
        You can create a new database for your application with MongoDB Atlas, or use the same database from the previous part's exercises.
    - New database blogApp->blogs
    - add mongo.js, Mongo.js turned out to be a headache but now working. :)
    - Verify it is possible to add blogs to the list and that application returns the added blogs at the correct endpoint.  
    Should the rest post add to Mongo ? solve this and task 4.1 is done! Posting to blogApp->blogs!!! I had wrong connection string in .env with my personApp, I changed this to blogApp and now it works!

4.2 Refactor application to separate modules!
    - check index.js, old code commented!
    - check controller/notes.js also change name to persons.js!
            Also 
            app.delete('/api/notes/:id', (request, response, next) => { 
            changes to 
            notesRouter.delete('/:id', (request, response, next) => {
    - check app.js! configure this to my program!!
    - utils/middleware.js from course material CONFIGURE THIS TO MY PROGRAM!
    - person.js old code commented and added course material for note.js CONFIGURE TO MY PROGRAM!
    - Check logger to be correct!
    TODO: almost all done. However i'm currently printing my connection string to terminal which i dont like... DONE
    Refactoring app.js times out my mongo conneciton for some reason....
    refactoring done. I had to do quite a bit of changes to the project.


