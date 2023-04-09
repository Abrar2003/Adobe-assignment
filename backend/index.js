const express = require("express");
const mongoose = require("mongoose");
const config = require("./src/config.js");
const UserRouter = require("./src/routers/user.router.js");
const PostsRouter = require("./src/routers/posts.router.js");
const AnalyticsRouter = require("./src/routers/analytics.router.js");

const app = express();

app.use(express.json());
app.use("/users",UserRouter);
app.use("/posts", PostsRouter);
app.use("/analytics", AnalyticsRouter);


app.listen(8080, async() => {
    await mongoose.connect(config.mongo.url);
    console.log("Listening on port 8080")
})