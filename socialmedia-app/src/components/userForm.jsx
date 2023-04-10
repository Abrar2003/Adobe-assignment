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
import { Link, redirect } from "react-router-dom";

export default function UserForm() {
  const intialUser = {
    name: "",
    email: "",
    bio: "",
  };
  const [allUsers, setAll] = useState([]);
  const [user, setUser] = useState(intialUser);
  useEffect(()=> {
    axios.get("https://light-kimono-yak.cyclic.app/users")
    .then((res)=> setAll(res.data));
  })
  const onChange = (e) => {
    const { name: key, value } = e.target;
    setUser({
      ...user,
      [key]: value,
    });
  };
  const onSubmit = async()=>{
    const oldUser = allUsers.find( obj => obj.email == user.email);
    if(oldUser){
        alert("User already exist");
        return;
    }
    try{

        const newUser = await axios.post("https://light-kimono-yak.cyclic.app/users", user)
        const user_id = newUser.data._id
        console.log(user_id)
        localStorage.setItem("user_id", user_id)
        alert("User Succefully created");
        redirect("/");
    }
    catch(err){
        alert(err.response.data.message);
    }
    // localStorage.setItem("user_id", user_id);
  }

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
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Box>
              <FormControl id="fullName" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input type="text" name="name" onChange={(e) => onChange(e)} />
              </FormControl>
            </Box>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" onChange={(e) => onChange(e)} />
            </FormControl>
            <FormControl id="bio">
              <FormLabel>Bio</FormLabel>
              <Textarea type={"text"} name="bio" maxLength={200} onChange={(e) => onChange(e)} />
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
                onClick={()=>onSubmit()}
                >
                Register
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
