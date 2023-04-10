import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Grid, Heading, Box } from "@chakra-ui/react";
import axios from "axios";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("https://light-kimono-yak.cyclic.app/posts")
    .then(res => setPosts(res.data));
  }, []);
  const deletePost = async (id) => {
    alert("You are deleting this Post");
    await axios.delete(`https://light-kimono-yak.cyclic.app/posts/${id}`);
    axios.get("https://light-kimono-yak.cyclic.app/posts")
    .then(res => setPosts(res.data));
  };
  return (
    <Box>
    <Heading mb={"30px"} align={"center"} color={"white"}>All Posts</Heading>
    <Grid
      m={"auto"}
      justifyContent={"center"}
      w={["90%", "70%", "40%", "50%", "60%"]}
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
      ]}
      gap={"30px"}
      >
      {posts.map((e) => (
        <PostCard key={e._id} deletePost={deletePost} username={e.username} id={e._id} />
        ))}
    </Grid>
        </Box>
  );
}
