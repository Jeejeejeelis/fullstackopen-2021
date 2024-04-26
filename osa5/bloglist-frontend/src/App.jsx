import axios from 'axios'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null });

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
        setNotification({ message: null, type: null });
    }, 5000); 
};
//   const handleLogin = (event) => {
//     event.preventDefault()
//     console.log('logging in with', username, password)
//   }
const handleLogin = async (event) => {
    event.preventDefault()

    try {
        const user = await loginService.login({
        username, password,
        })

        window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
          )

        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
        showNotification(`Welcome, ${user.name}!`, 'success');
    } catch (exception) {
        showNotification('wrong username or password', 'error');
        setTimeout(() => {
        setErrorMessage(null)
        }, 5000)
    }
}

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser');
        setUser(null);
        showNotification('You have successfully logged out', 'success');
    };

    const handleLike = async (id) => {
        const blog = blogs.find(b => b.id === id);
        const updatedBlog = { ...blog, likes: blog.likes + 1 };
    
        const response = await axios.put(`/api/blogs/${id}`, updatedBlog);
        setBlogs(blogs.map(b => b.id !== id ? b : response.data));
        showNotification('Blog has been successfully liked', 'success');
    };

    //This does not work yet..
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Do you really want to delete this blog?");
        if (confirmDelete) {
            await axios.delete(`/api/blogs/${id}`);
            setBlogs(blogs.filter(b => b.id !== id));
            showNotification('Blog has been successfully deleted', 'success');
        }
    };

    // Filter all the blogs of the logged in user!
    const blogsToShow = user ? blogs.filter(blog => blog.user.name === user.name) : [];

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
            username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
            </div>
            <div>
            password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type="submit">login</button>
        </form>      
        )

        const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 });

        const handleBlogChange = (event) => {
            setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
        };

        const addBlog = async (event) => {
            event.preventDefault();

            const config = {
                headers: { Authorization: `bearer ${user.token}` },
            };

            const response = await axios.post('/api/blogs', newBlog, config);
            if (response.status === 201) {
                showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success');
            } else {
                showNotification('An error occurred while adding the blog', 'error');
            }

            setBlogs(blogs.concat(response.data));
            setNewBlog({ title: '', author: '', url: '', likes: 0 }); // Clear the form fields
        };

        const blogForm = () => (
            <form onSubmit={addBlog}>
                <div>
                    <label>
                        Title:
                        <input
                        name="title"
                        value={newBlog.title}
                        onChange={handleBlogChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Author:
                        <input
                        name="author"
                        value={newBlog.author}
                        onChange={handleBlogChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        URL:
                        <input
                        name="url"
                        value={newBlog.url}
                        onChange={handleBlogChange}
                        />
                    </label>
                </div>
                <button type="submit">create</button>
            </form>  
        );
return (
    
    <div>
        {notification.message && 
            <div className={`notification ${notification.type}`}>
                {notification.message}
            </div>
        }
        <h1>Blogs</h1>

        {user && <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
            <h2>Create New</h2>
            {blogForm()}
        </div>
        }

        {!user && loginForm()}

        <div>
        </div>      
        <ul>
        {blogsToShow.map(blog => 
            <Blog
            key={blog.id}
            blog={blog}
            handleLike={() => handleLike(blog.id)}
            handleDelete={() => handleDelete(blog.id)}
            />
        )}
        </ul>
    </div>
)
}

export default App