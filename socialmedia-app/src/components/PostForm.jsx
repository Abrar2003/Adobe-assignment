import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { redirect } from "react-router-dom";

export default function PostForm() {
  const [user_id, setUser_id] = useState("");
  const [post, setPost] = useState({});
  useEffect(() => {
    setUser_id(localStorage.getItem("user_id"));
  }, []);
  const onChange = (val) => {
    setPost({
      ...post,
      content: val,
    });
  };
  const onSubmit = async () => {
    const posted = await axios.post("https://light-kimono-yak.cyclic.app/posts", {...post, user_id});
    if(posted){
        alert("Your thought is successfully posted");
        redirect("/");
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Create a new post
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Tell your thoughts to other users and enjoy ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Text align="center" fontWeight={500} fontSize={"3xl"}>
              New Post! ✌️
            </Text>
            <FormControl id="bio">
              <FormLabel fontSize={"l"}>Content of your post</FormLabel>
              <Textarea
                type={"text"}
                name="content"
                maxLength={300}
                placeholder="Your thoughts..."
                onChange={(e) => onChange(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={onSubmit}
              >
                Post
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
