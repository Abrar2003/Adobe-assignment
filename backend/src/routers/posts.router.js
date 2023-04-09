const express = require("express");
const mongoose = require("mongoose")
const Post = require("../models/post.model");

const PostsRouter = express.Router();

PostsRouter.use(express.urlencoded({ extended: true }));
PostsRouter.use(express.json());

//GET /posts/ Get all the posts for postList
PostsRouter.get("/", async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $project: {
          _id: 1,
          content: 1,
          likes: 1,
          created_at: 1,
          updated_at: 1,
          username: "$user.name"
        }
      }
    ])
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// POST /posts: Create a new post. The request should include the user_id.
PostsRouter.post("/", async (req, res) => {
  try {
    const post = new Post({
      user_id: req.body.user_id,
      content: req.body.content,
    });
    const savedPost = await post.save();
    res.status(201).send(savedPost);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// GET /posts/:id: Retrieve a post by id.
PostsRouter.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post){
      res.status(200).send(post);
    }else{
      res.status(404).send({message: "Post not found"});
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// PUT /posts/:id: Update a post's content by id.
PostsRouter.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      post.content = req.body.content;
      post.updated_at = Date.now();
      const updatedPost = await post.save();
      res.send(updatedPost);
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// DELETE /posts/:id: Delete a post by id.
PostsRouter.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      await post.remove();
      res.send({ message: "Post deleted" });
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// POST /posts/:id/like: Increment the like count of a post by id.
PostsRouter.post("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      post.likes++;
      const updatedPost = await post.save();
      res.send(updatedPost);
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// POST /posts/:id/unlike: Decrement the like count of a post by id. The count should not go below 0.
PostsRouter.post("/:id/unlike", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      if (post.likes > 0) {
        post.likes--;
        const updatedPost = await post.save();
        res.send(updatedPost);
      } else {
        res.send(post);
      }
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = PostsRouter;
