const express = require("express");
const User = require("../models/user.model");
const Post = require("../models/post.model");

const AnalyticsRouter = express.Router();

AnalyticsRouter.use(express.urlencoded({ extended: true }));

AnalyticsRouter.use(express.json());

// Endpoint to get total count of users
AnalyticsRouter.get("/users", async (req, res) => {
  try {
    console.log("b");
    const TotalUsers = await User.countDocuments();
    res.status(200).send({ TotalUsers });
  } catch (err) {
    console.log("e");
    res.status(400).send({ message: err.message });
  }
});


// Endpoint to get Top-5 active Users
AnalyticsRouter.get("/users/top-active", async (req, res) => {
  const p = await Post.aggregate([
    { $group: { _id: "$user_id", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);
  const ids = p.map((obj) => obj._id);
  console.log(ids);
  try {
    const topUsers = await User.find({ _id: { $in: ids } });
    res.status(200).send(topUsers);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Endpoint to get total count of Posts
AnalyticsRouter.get("/posts", async (req, res) => {
  try {
    const TotalPosts = await Post.countDocuments();
    res.status(200).send({ TotalPosts });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

AnalyticsRouter.get("/posts/top-liked", async (req, res) => {
  try {
    const mostLiked = await Post.find().sort({ likes: -1 }).limit(5);
    res.status(200).send(mostLiked);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = AnalyticsRouter;
