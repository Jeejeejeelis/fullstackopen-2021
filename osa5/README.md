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


