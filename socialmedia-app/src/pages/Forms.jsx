import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { TfiThought } from "react-icons/tfi";
import { FaUsers } from "react-icons/fa";
import React, { useState } from "react";
import UserForm from "../components/userForm";
import PostForm from "../components/PostForm";

export default function Forms() {
  const [show, setShow] = useState("user");
  const showPosts = () => {
    setShow("post");
  };
  const showUsers = () => {
    setShow("user");
  };
  const shadow = {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  };
  return (
    <Box>
      <Flex
      boxSizing="border-box"
        style={shadow}
        mb={"30px"}
        color={"#000035"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        h={"30px"}
        bg={"gray.500"}
        p={["1.5rem 0.5rem", "1.5rem", "2rem", "2rem", "2rem"]}
      >
        <Button onClick={showPosts} disabled={show == "posts"}>
          <Flex
            fontSize={["xs", "md", "l", "xl", "xl"]}
            gap={["5px", "10px", "15px", "20px", "20px"]}
            align={"center"}
          >
            <Text>New User</Text>
            <FaUsers />
          </Flex>
        </Button>
        <Button onClick={showUsers} disabled={show == "users"}>
          <Flex
            fontSize={["xs", "md", "l", "xl", "xl"]}
            gap={["5px", "10px", "15px", "20px", "20px"]}
            align={"center"}
          >
            <Text>New Post</Text>
            <TfiThought />
          </Flex>
        </Button>
      </Flex>
      {show !== "user" ? <UserForm /> : <PostForm />}
    </Box>
  );
}
