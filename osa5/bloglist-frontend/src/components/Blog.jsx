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
    <li className='blog'>
      <div style={blogStyle}>
        <div className='blogDefaultView'>
          <span className='blogTitle'>{blog.title}</span> <span className='blogAuthor'>{blog.author}</span>
          <button onClick={toggleDetails}>{detailsVisible ? 'hide' : 'view'}</button>
        </div>
        {detailsVisible && (
          <div className='blogDetails'>
            <span className='blogUrl'>{blog.url}</span><br/>
            <span className='blogLikes'>likes {blog.likes}</span>
            <button onClick={handleLike}>like</button><br/>
            <span className='blogUser'>{blog.user.name}</span><br/>
            {currentUser && currentUser.username === blog.user.username && (
              <button onClick={() => handleDelete(blog.id)}>remove</button>
            )}
          </div>
        )}
      </div>
    </li>
  )
}

export default Blog