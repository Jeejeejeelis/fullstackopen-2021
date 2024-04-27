import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })
  const blogFormRef = useRef()

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  // useEffect(() => {
  //     blogService.getAll().then(blogs =>
  //         setBlogs( blogs )
  //     )
  // }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
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
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    showNotification('You have successfully logged out', 'success')
  }

  const handleLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    await blogService.update(id, updatedBlog)
    const updatedBlogs = blogs.map(b => b.id !== id ? b : updatedBlog)
    const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
    showNotification('Blog has been successfully liked', 'success')
  }

  // const handleLike = async (id) => {
  //     const blog = blogs.find(b => b.id === id);
  //     const updatedBlog = { ...blog, likes: blog.likes + 1 };

  //     await blogService.update(id, updatedBlog);
  //     blogService.getAll().then(blogs => {
  //         setBlogs(blogs)
  //         showNotification(`Blog has been successfully liked`, 'success');
  //     })
  //     .catch(error => {
  //         showNotification('An error occurred while liking the blog', 'error');
  //     })
  // };

  //This does not work yet..
  const handleDelete = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const confirmDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (confirmDelete) {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
      showNotification('Blog has been successfully deleted', 'success')
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        blogService.getAll().then(blogs => {
          setBlogs(blogs)
          showNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success')
        })
      })
      .catch(error => {
        showNotification('An error occurred while adding the blog', 'error')
      })
  }

  const blogsToShow = user ? blogs.filter(blog => blog.user.name === user.name) : []

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
      showNotification(`Welcome, ${user.name}!`, 'success')
    } catch (exception) {
      showNotification('wrong username or password', 'error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      {(toggleVisibility) => (
        <BlogForm
          createBlog={async (blog) => {
            await addBlog(blog)
            toggleVisibility()
          }}
        />
      )}
    </Togglable>
  )

  return (
    <div>
      {notification.message &&
                <div className={`notification ${notification.type}`}>
                  {notification.message}
                </div>
      }
      <h1>Blogs</h1>

      {user ? (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          <ul>
            {blogsToShow.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={() => handleLike(blog.id)}
                handleDelete={() => handleDelete(blog.id)}
                currentUser={user}
              />
            )}
          </ul>
        </div>
      ) : (
        <Togglable buttonLabel="log in">
          {toggleVisibility => (
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          )}
        </Togglable>
      )}
    </div>
  )

}

export default App