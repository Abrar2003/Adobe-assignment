const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    minlength: 1,
    maxlength: 300,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    min: 0,
    default: 0
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
