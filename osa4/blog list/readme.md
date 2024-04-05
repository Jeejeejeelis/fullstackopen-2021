kill -9 $(lsof -t -i:3003)
npm run dev      to run in dev mode!
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

4.3
Let's create a collection of helper functions that are metest showing described blocksh the blog list. Create the functions into a file called utils/list_helper.js. Write your tests into an appropriately named test file under the tests directory.

Helper Functions and Unit Tests, step 1
First, define a dummy function that receives an array of blog posts as a parameter and always returns the value 1. The contents of the list_helper.js file at this point should be the following:
    const dummy = (blogs) => {
    // ...
    }

    module.exports = {
    dummy
    }

Verify that your test configuration works with the following test:
    const { test, describe } = require('node:test')
    const assert = require('node:assert')
    const listHelper = require('../utils/list_helper')

    test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
    })
TODO: 
- create file utils/list_helper.js and copy course contents there! DONE
- Define the npm script test for the test execution. DONE - package.json modified!
- Create test directory and appropriately named test file. DONE dummy.test.js created, like in course contents(reverse.test.js).
- Guessing that i run it with npm test? Yes this works! DONE
(160.394455ms)
ℹ tests 1
ℹ suites 0
ℹ pass 1
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 167.01173
4.3 DONE!

4.4: Helper Functions and Unit Tests, step 2
Define a new totalLikes function that receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts.

Write appropriate tests for the function. It's recommended to put the tests inside of a describe block so that the test report output gets grouped nicely: CHECK COURSE CONTENT

Defining test inputs for the function can be done like this:
describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

If defining your own test input list of blogs is too much work, you can use the ready-made list here.

You are bound to run into problems while writing tests. Remember the things that we learned about debugging in part 3. You can print things to the console with console.log even during test execution.

4.4 seems to be done? all tests return pass... 

4.5*: Helper Functions and Unit Tests, step 3
Define a new favoriteBlog function that receives a list of blogs as a parameter. The function finds out which blog has the most likes. If there are many top favorites, it is enough to return one of them.

The value returned by the function could be in the following format:

{
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  likes: 12
}
NB when you are comparing objects, the deepStrictEqual method is probably what you want to use, since the strictEqual tries to verify that the two values are the same value, and not just that they contain the same properties. For differences between various assert module functions, you can refer to this Stack Overflow answer.

Write the tests for this exercise inside of a new describe block. Do the same for the remaining exercises as well.
TO DO:
    - Define a new favoriteBlog function in list_helper.js that receives a list of blogs as a parameter. The function finds out which blog has the most likes. If there are many top favorites, it is enough to return one of them. DONE
    - create similar tests as 4.4 but with deepStrictEqual as instructed. DONE
    - REMEMBER TO DO THIS FOR REMAINING EXERCISES ASWELL!!!!
    - npm test ran with 7 passes after a couple of tries!
    - I hope these tests are sufficient?
4.5* done! Nope it had some errors!

4.6*: Helper Functions and Unit Tests, step 4
This and the next exercise are a little bit more challenging. Finishing these two exercises is not required to advance in the course material, so it may be a good idea to return to these once you're done going through the material for this part in its entirety.

Finishing this exercise can be done without the use of additional libraries. However, this exercise is a great opportunity to learn how to use the Lodash library.

Define a function called mostBlogs that receives an array of blogs as a parameter. The function returns the author who has the largest amount of blogs. The return value also contains the number of blogs the top author has:
    {
    author: "Robert C. Martin",
    blogs: 3
    }
If there are many top bloggers, then it is enough to return any one of them.
TODO:
 - define function mostBlogs in list_helper.js
 - Function returns the author who has the largest amount of blogs. The return value also contains the number of blogs the top author has. DONE! now test it if it's correct
 - Create new describe tests like in 4.5! I can use the same test set as before since there is authors with multiple posts! DONE!
 - test this! Somehow 4.5* was broken. i mightve broken it... fixed some errors in mostBlogs. Now tests go through!
 4.6* DONE!


4.7*: Helper Functions and Unit Tests, step 5
Define a function called mostLikes that receives an array of blogs as its parameter. The function returns the author, whose blog posts have the largest amount of likes. The return value also contains the total number of likes that the author has received:
    {
    author: "Edsger W. Dijkstra",
    likes: 17
    }
If there are many top bloggers, then it is enough to show any one of them.
TODO: 
- define function mostLikes in list_helper.js
- The function returns the author, whose blog posts have the largest amount of likes.
- same as 4.6* but now i sum the likes...
- Easy. DONE!

Warning: If you find yourself using async/await and then methods in the same code, it is almost guaranteed that you are doing something wrong. Use one or the other and don't mix the two.

4.8-> prework:

- Next, let's change the scripts in our notes application package.json file, so that when tests are run, NODE_ENV gets the value tests.
Original if we still need it:
        "test": "node --test",
        "start": "node index.js",
        "dev": "nodemon index.js"

- Let's make some changes to the module that defines the application's configuration in utils/config.js:
    Commented earlier code.
- Let's write our first test in the tests/note_api.test.js file:
- The tests only use the Express application defined in the app.js file, which does not listen to any ports:
    Maybe i need this?
    Index.js:
        const mongoose = require('mongoose')
        const supertest = require('supertest')
        const app = require('../app')

        const api = supertest(app)
- The middleware that outputs information about the HTTP requests is obstructing the test execution output. Let us modify the logger so that it does not print to the console in test mode: DONE
- I can test with this:
    npm test -- --test-only
-Another way to test but then i think i need to remove .only from tests:
    npm test -- --test-name-pattern="the title of the first blog is TestPost1"
- Test all with blogs in their name:
    npm run test -- --test-name-pattern="blogs"

Now im at async/await part!

- Added test_helper.js

Changed BlogsRouter.delete to use express-async-errors library. If this works change all the routes simirlarly! 

Start of 4.8!!!

4.8: Blog List Tests, step 1
Use the SuperTest library for writing a test that makes an HTTP GET request to the /api/blogs URL. Verify that the blog list application returns the correct amount of blog posts in the JSON format.

Once the test is finished, refactor the route handler to use the async/await syntax instead of promises.

Notice that you will have to make similar changes to the code that were made in the material, like defining the test environment so that you can write tests that use separate databases.

NB: when you are writing your tests it is better to not execute them all, only execute the ones you are working on. Read more about this here.

npm run test -- --test-name-pattern="blogs"
npm test -- --test-name-pattern='notes are returned as json'

It seems all my prework has already done this task. 4.8 done!

4.9: Blog List Tests, step 2
Write a test that verifies that the unique identifier property of the blog posts is named id, by default the database names the property _id.

Make the required changes to the code so that it passes the test. The toJSON method discussed in part 3 is an appropriate place for defining the id parameter.

- Added new test, prework had done rest like toJSON. Added require Assert so my test works.

npm test -- --test-name-pattern='unique identifier property of the blog posts is named id'
4.9 done!

4.10: Blog List Tests, step 3
Write a test that verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post. At the very least, verify that the total number of blogs in the system is increased by one. You can also verify that the content of the blog post is saved correctly to the database.

Once the test is finished, refactor the operation to use async/await instead of promises.

- Did this when reading material and doing prework. Let's test if it works!
npm test -- --test-name-pattern='a valid blog can be added'

- Added log to show that new post really went to database. beforeEach deletes it before i can see it in mongo...

-Tests through! 4.10 done!

4.11*: Blog List Tests, step 4
Write a test that verifies that if the likes property is missing from the request, it will default to the value 0. Do not test the other properties of the created blogs yet.

Make the required changes to the code so that it passes the test.

- Modify prework test to account for no likes.  Done
- Add defaulting value to Model!

npm test -- --test-name-pattern='blog without likes is not added'

Fixed a few minor problems and added log to see results.
Test ok! 4.11 done!


4.12*: Blog List tests, step 5
Write tests related to creating new blogs via the /api/blogs endpoint, that verify that if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.

Make the required changes to the code so that it passes the test.

- Modify post handler in blogrouter. 
- Add new test for it! exoect error 400!

npm test -- --test-name-pattern='blog without title is not added'
Test works! 4.12* done!

Next 4.13 and 4.14!

4.13 Blog List Expansions, step 1
Implement functionality for deleting a single blog post resource.
- controllers/blogs.js implement deletion with async
        - use express-async-errors for cleaner code
        - I've done these ini prework already!

Use the async/await syntax. Follow RESTful conventions when defining the HTTP API.

Implement tests for the functionality.
npm test -- --test-name-pattern='a blog can be deleted'
Added console log to test to see if it returns a list where first blogpost is deleted.
It seems to work.
Used async/await!
Used RESTful conventions!
4.13 done!


4.14 Blog List Expansions, step 2
Implement functionality for updating the information of an individual blog post.

Use async/await.

The application mostly needs to update the number of likes for a blog post. You can implement this functionality the same way that we implemented updating notes in part 3.

Implement tests for the functionality.
- Add async/await to put method!
- use express-async-errors for cleaner code!
- create test for this!
- console log to see everything is working ok!
npm test -- --test-name-pattern='blog can be updated'
- Used a little more time to make the put method to be able to update anything, not just likes!
4.14 done!


In the next exercises, the basics of user management will be implemented for the Bloglist application. The safest way is to follow the course material from part 4 chapter User administration to the chapter Token authentication. You can of course also use your creativity.

One more warning: If you notice you are mixing async/await and then calls, it is 99% certain you are doing something wrong. Use either or, never both.

4.15: Blog List Expansion, step 3
Implement a way to create new users by doing an HTTP POST request to address api/users. Users have a username, password and name.

Do not save passwords to the database as clear text, but use the bcrypt library like we did in part 4 chapter Creating users.

NB Some Windows users have had problems with bcrypt. If you run into problems, remove the library with command

npm uninstall bcrypt copy
and install bcryptjs instead.

Implement a way to see the details of all users by doing a suitable HTTP request.

To do: 
    prework: follow instructions from user administration to token authentication
    - Add bearer scheme and change creating new notes!
     - Added code to middleware.js
     - add path to login.js to app.js
     Trouble with tests. dELETED     describe...
npm test -- --test-name-pattern='creation succeeds with a fresh username'
All prework has been done and works succesfully!


4.15

Implement a way to create new users by doing an HTTP POST request to address api/users. Users have a username, password and name. Prework i did this!

Do not save passwords to the database as clear text, but use the bcrypt library like we did in part 4 chapter Creating users. prework i did this!

Currently my localhost:3003/apu/users looks like this:
{
username: "EelisP",
name: "EelisP",
blogs: [
{
title: "test bearer Schema!",
author: "EelisP",
url: "eelisp.com",
likes: 5,
id: "660fdc87e0130772658edde1"
},
{
title: "test bearer Schema! Correct again!",
author: "EelisP",
url: "eelisp.com",
likes: 5,
id: "660fdcaee0130772658edde5"
}
],
id: "660fdc0fe0130772658edddd"
}
]

Make it cleaner with only username name and id!
run new tests
test wit more users
4.15 done all tests passed!

4.16*: Blog List Expansion, step 4
Add a feature which adds the following restrictions to creating new users: Both username and password must be given and both must be at least 3 characters long. The username must be unique.

The operation must respond with a suitable status code and some kind of an error message if an invalid user is created.

NB Do not test password restrictions with Mongoose validations. It is not a good idea because the password received by the backend and the password hash saved to the database are not the same thing. The password length should be validated in the controller as we did in part 3 before using Mongoose validation.

Also, implement tests that ensure invalid users are not created and that an invalid add user operation returns a suitable status code and error message.

NB if you decide to define tests on multiple files, you should note that by default each test file is executed in its own process (see Test execution model in the documentation). The consequence of this is that different test files are executed at the same time. Since the tests share the same database, simultaneous execution may cause problems. Problems are avoided by executing the tests with the option --test-concurrency=1, i.e. defining them to be executed sequentially.

npm test -- --test-name-pattern='unique username fails with proper statuscode'
npm test -- --test-name-pattern='creation fails with short username and password'

Having problems with unique username... 
FINALLY solved the problem!!!!!!!
4.16* done


4.17: Blog List Expansion, step 5
Expand blogs so that each blog contains information on the creator of the blog.

Modify adding new blogs so that when a new blog is created, any user from the database is designated as its creator (for example the one found first). Implement this according to part 4 chapter populate. Which user is designated as the creator does not matter just yet. The functionality is finished in exercise 4.19.

Modify listing all blogs so that the creator's user information is displayed with the blog:
4.17

4.18: Blog List Expansion, step 6
Implement token-based authentication according to part 4 chapter Token authentication.

I have done this already!

4.19 I had done it already, however i had to modify my code for the tasks 4.16 and 4.17. Now i modified it back!
4.19 done!