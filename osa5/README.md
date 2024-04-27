5.1: Blog List Frontend, step 1
Clone the application from GitHub with the command:

git clone https://github.com/fullstack-hy2020/bloglist-frontendcopy
Remove the git configuration of the cloned application

cd bloglist-frontend   // go to cloned repository
rm -rf .gitcopy
The application is started the usual way, but you have to install its dependencies first:

npm install     ----done
npm run dev     --- done npm run dev worked with both front and backend. However course material instructs to start frontend with npm start, this did not work...
Implement login functionality to the frontend. The token returned with a successful login is saved to the application's state user.

If a user is not logged in, only the login form is visible.

If the user is logged-in, the name of the user and a list of blogs is shown.

User details of the logged-in user do not have to be saved to the local storage yet.

window.localStorage.setItem(
    'loggedNoteappUser', JSON.stringify(user)
    )
The details of a logged-in user are now saved to the local storage, and they can be viewed on the console (by typing window.localStorage in it):

NB You can implement the conditional rendering of the login form like this for example:
            if (user === null) {
                return (
                <div>
                    <h2>Log in to application</h2>
                    <form>
                    //...
                    </form>
                </div>
                )
            }

            return (
                <div>
                <h2>blogs</h2>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
                </div>
            )
        }

I can logout with: window.localStorage.removeItem('loggedBlogappUser') from console!

If a user is not logged in, only the login form is visible -- DONE

If the user is logged-in, the name of the user and a list of blogs is shown.
    Currently I retrieve all blogs. filter out only the blogs the user has written!


5.2: Blog List Frontend, step 2
Make the login 'permanent' by using the local storage. Also, implement a way to log out.
Ensure the browser does not remember the details of the user after logging out.

Both done!

5.3: Blog List Frontend, step 3
Expand your application to allow a logged-in user to add new blogs:

Done!

5.4: Blog List Frontend, step 4
Implement notifications that inform the user about successful and unsuccessful operations at the top of the page. For example, when a new blog is added, the following notification can be shown:
        a new blog  $blogTitle$ by $blog author$ added 
        wrong username or password
The notifications must be visible for a few seconds.

DONE
Commit! 5.1-5.4 done


5.5 Blog List Frontend, step 5
Change the form for creating blog posts so that it is only displayed when appropriate. Use functionality similar to what was shown earlier in this part of the course material. If you wish to do so, you can use the Togglable component defined in part 5.

By default the form is not visible
It expands when button create new blog is clicked
The form hides again after a new blog is created.
Prework has the solution! Alot had to be modified but i think im now done....
No wait i need to modify the blog creation form to be togglable!
DOne!
go to next part!


5.6 Blog List Frontend, step 6
Separate the form for creating a new blog into its own component (if you have not already done so), and move all the states required for creating a new blog to this component.

The component must work like the NoteForm component from the material of this part.

I have most likely got this correct now....
Move on to next part!


5.7 Blog List Frontend, step 7
Let's add a button to each blog, which controls whether all of the details about the blog are shown or not.

Full details of the blog open when the button is clicked.

And the details are hidden when the button is clicked again.

At this point, the like button does not need to do anything.

The application shown in the picture has a bit of additional CSS to improve its appearance.

It is easy to add styles to the application as shown in part 2 using inline styles:
        const Blog = ({ blog }) => {
            const blogStyle = {
                paddingTop: 10,
                paddingLeft: 2,
                border: 'solid',
                borderWidth: 1,
                marginBottom: 5
            }

            return (
                <div style={blogStyle}>
                <div>
                    {blog.title} {blog.author}
                </div>
                // ...
            </div>
        )}

NB: Even though the functionality implemented in this part is almost identical to the functionality provided by the Togglable component, it can't be used directly to achieve the desired behavior. The easiest solution would be to add a state to the blog component that controls if the details are being displayed or not.


STARTING WITH 5.7:
    This was pretty straight forward. DONE


5.8: Blog List Frontend, step 8
Implement the functionality for the like button. Likes are increased by making an HTTP PUT request to the unique address of the blog post in the backend.

Since the backend operation replaces the entire blog post, you will have to send all of its fields in the request body. If you wanted to add a like to the following blog post:

        {
        _id: "5a43fde2cbd20b12a2c34e91",
        user: {
            _id: "5a43e6b6c37f3d065eaaa581",
            username: "mluukkai",
            name: "Matti Luukkainen"
        },
        likes: 0,
        author: "Joel Spolsky",
        title: "The Joel Test: 12 Steps to Better Code",
        url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/"
        },

You would have to make an HTTP PUT request to the address /api/blogs/5a43fde2cbd20b12a2c34e91 with the following request data:

        {
        user: "5a43e6b6c37f3d065eaaa581",
        likes: 1,
        author: "Joel Spolsky",
        title: "The Joel Test: 12 Steps to Better Code",
        url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/"

The backend has to be updated too to handle the user reference.
        }

Start with 5.8!
    I have already done most of the like functionality... however when like is pressed it makes the blog disappear until refreshed!
DONE!

5.9: Blog List Frontend, step 9
We notice that something is wrong. When a blog is liked in the app, the name of the user that added the blog is not shown in its details:
When the browser is reloaded, the information of the person is displayed. This is not acceptable, find out where the problem is and make the necessary correction.

Of course, it is possible that you have already done everything correctly and the problem does not occur in your code. In that case, you can move on.

Start with this! Mine works fine... next part!

5.10: Blog List Frontend, step 10
Modify the application to sort the blog posts by the number of likes. The Sorting can be done with the array sort method.

Now it works, However I need to refresh in order to have the correct order! Sort also in handleLike worked like a charm.


5.11: Blog List Frontend, step 11
Add a new button for deleting blog posts. Also, implement the logic for deleting blog posts in the frontend.

Your application could look something like this:

The confirmation dialog for deleting a blog post is easy to implement with the window.confirm function.

Show the button for deleting a blog post only if the blog post was added by the user.


5.12: Blog List Frontend, step 12
Define PropTypes for one of the components of your application, and add ESlint to the project. Define the configuration according to your liking. Fix all of the linter errors.

Vite has installed ESlint to the project by default, so all that's left for you to do is define your desired configuration in the .eslintrc.cjs file.

TO GET STARTED!
npm run dev  backend
npm start    frontend

kill -9 $(lsof -t -i:3003)
Happy coding :)
