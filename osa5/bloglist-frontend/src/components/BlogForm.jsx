import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '', likes: 0 })
  }

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <label>
          Title:
          <input
            name="title"
            value={newBlog.title}
            onChange={handleBlogChange}
          />
        </label>
        <label>
          Author:
          <input
            name="author"
            value={newBlog.author}
            onChange={handleBlogChange}
          />
        </label>
        <label>
          URL:
          <input
            name="url"
            value={newBlog.url}
            onChange={handleBlogChange}
          />
        </label>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm