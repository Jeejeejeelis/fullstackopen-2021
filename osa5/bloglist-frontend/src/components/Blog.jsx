const Blog = ({ blog, handleLike, handleDelete }) => (
    <div>
      {blog.title} {blog.author}
      <button onClick={handleLike}>like</button>
      <button onClick={handleDelete}>delete</button>
    </div>  
  )
  
  export default Blog