import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Grid } from "@chakra-ui/react";
import axios from "axios";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("https://light-kimono-yak.cyclic.app/posts")
    .then(res => setPosts(res.data));
  }, []);
  console.log(posts);
  return (
    <Grid
      m={"auto"}
      w={["90%", "70%", "40%", "40%", "40%"]}
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
      ]}
      gap={"30px"}
    >
      {posts.map((e) => (
        <PostCard key={e._id} username={e.username} id={e._id} />
      ))}
    </Grid>
  );
}
