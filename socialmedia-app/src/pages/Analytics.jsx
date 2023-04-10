import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { DiGoogleAnalytics } from "react-icons/di";
import React, { useState } from "react";
import UserAnalytics from "../components/UserAnalytics";
import PostAnalytics from "../components/PostAnalytics";

export default function Analytics() {
  const [show, setShow] = useState("posts");
  const showPosts = () => {
    setShow("posts");
  };
  const showUsers = () => {
    setShow("users");
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
            <Text>User Analytics</Text>
            <DiGoogleAnalytics />
          </Flex>
        </Button>
        <Button onClick={showUsers} disabled={show == "users"}>
          <Flex
            fontSize={["xs", "md", "l", "xl", "xl"]}
            gap={["5px", "10px", "15px", "20px", "20px"]}
            align={"center"}
          >
            <Text>Post Analytics</Text>
            <DiGoogleAnalytics />
          </Flex>
        </Button>
      </Flex>
      {show === "posts" ? <UserAnalytics /> : <PostAnalytics />}
    </Box>
  );
}
