import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PostCard({ id, username }) {
  const [liked, setLiked] = useState(0);
  const [post, setPost] = useState({});
  useEffect(() => {
    axios(`https://light-kimono-yak.cyclic.app/posts/${id}`).then((res) =>
      setPost(res.data)
    );
  }, [liked]);

  const shadow = {
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  };
  const like = async () => {
    if (!liked) {
      await axios.post(`https://light-kimono-yak.cyclic.app/posts/${id}/like`);
      setLiked(1);
    }
    else{
        alert("You can only like a post once")
    }
  };
  const dislike = async () => {
    if(liked){
        await axios.post(`https://light-kimono-yak.cyclic.app/posts/${id}/unlike`);
        setLiked(0);
    }
    else{
        alert("You can only dislike a post once");
    }
  };
  return (
    <Stack
      gap={"30px"}
      rounded={"lg"}
      bg={"gray.700"}
      p={["1rem 1rem", "1rem 1.5rem", "1rem 2rem", "1rem 2rem"]}
      style={shadow}
    >
      <Text fontSize={"2xl"}>{username}</Text>
      <Text fontSize={"l"}>{post.content}</Text>
      <Text>Likes: {post.likes}</Text>
      <Flex gap={"20px"}>
        <Button onClick={like} disabled={liked}>
          <AiFillLike />
        </Button>
        <Button onClick={dislike} disabled={!liked || post.likes == 0}>
          <AiFillDislike />
        </Button>
      </Flex>
    </Stack>
  );
}
