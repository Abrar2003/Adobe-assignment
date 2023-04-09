import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { TfiThought } from "react-icons/tfi";
import { FaUsers } from "react-icons/fa";
import React, { useState } from "react";
import PostList from "../components/postList";
import UserList from "../components/UserList";

export default function Home() {
    const [ show, setShow ] = useState("posts");
    const showPosts = ()=>{
        setShow("posts");
    }
    const showUsers = ()=>{
        setShow("users");
    }
  return (
    <Box>
      <Flex color={"#000035"} justifyContent={"space-evenly"} alignItems={"center"} h={"30px"} bg={"gray.500"} p={"2rem"}>
        <Button onClick = {showPosts} disabled={show == "posts"}>
          <Flex gap={"30px"} align={"center"}>
            <Text>All Posts</Text>
            <TfiThought />
          </Flex>
        </Button>
        <Button onClick = {showUsers} disabled={show == "users"}>
          <Flex gap={"30px"} align={"center"}>
            <Text>All Users</Text>
            <FaUsers />
          </Flex>
        </Button>
      </Flex>
      {
        show === "posts"?
        <PostList />
        :
        <UserList />
      }
    </Box>
  );
}
