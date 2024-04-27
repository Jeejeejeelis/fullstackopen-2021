import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleDetails}>{detailsVisible ? 'hide' : 'view'}</button>
      {detailsVisible && (
        <div>
          {blog.url}<br/>
                    likes {blog.likes}
          <button onClick={handleLike}>like</button><br/>
          {blog.user.name}<br/>
          {currentUser && currentUser.username === blog.user.username && (
            <button onClick={() => handleDelete(blog.id)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog