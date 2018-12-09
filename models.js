"use strict";

const mongoose = require("mongoose");
const uuid = require("uuid");

const blogPostSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  },
  created: { type: Date, default: Date.now }
});

blogPostSchema.virtual('authorName').get( function() {
  return `${this.firstName} + ${this.lastName}`
} )

blogPostSchema.methods.serialize = function() {
  return {
    _id: this._id,
    title: this.title,
    content: this.content,
    authorName: this.authorName,
    created: this.created
  };
};

// function StorageException(message) {
//   this.message = message;
//   this.name = "StorageException";
// }

// const BlogPosts = {
//   create: function(title, content, author, publishDate) {
//     const post = {
//       id: uuid.v4(),
//       title: title,
//       content: content,
//       author: author,
//       publishDate: publishDate || Date.now()
//     };
//     this.posts.push(post);
//     return post;
//   },
//   get: function(id = null) {
//     // if id passed in, retrieve single post,
//     // otherwise send all posts.
//     if (id !== null) {
//       return this.posts.find(post => post.id === id);
//     }
//     // return posts sorted (descending) by
//     // publish date
//     return this.posts.sort(function(a, b) {
//       return b.publishDate - a.publishDate;
//     });
//   },
//   delete: function(id) {
//     const postIndex = this.posts.findIndex(post => post.id === id);
//     if (postIndex > -1) {
//       this.posts.splice(postIndex, 1);
//     }
//   },
//   update: function(updatedPost) {
//     const { id } = updatedPost;
//     const postIndex = this.posts.findIndex(post => post.id === updatedPost.id);
//     if (postIndex === -1) {
//       throw new StorageException(
//         `Can't update item \`${id}\` because doesn't exist.`
//       );
//     }
//     this.posts[postIndex] = Object.assign(this.posts[postIndex], updatedPost);
//     return this.posts[postIndex];
//   }
// };

// function createBlogPostsModel() {
//   const storage = Object.create(BlogPosts);
//   storage.posts = [];
//   return storage;
// }

const BlogPost = mongoose.model("Blog-post", blogPostSchema);

module.exports = { BlogPost };
