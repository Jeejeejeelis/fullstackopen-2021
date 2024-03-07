const mongoose = require('mongoose')
const config = require('./utils/config')
const Blog = require('./models/blog')

mongoose.set('strictQuery',false)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message);
  });

module.exports = Blog