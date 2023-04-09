import React from "react";
import { Routes, Route } from "react-router-dom";
import UserForm from "./userForm";
import PostList from "./postList";
import { Box } from "@chakra-ui/react";
import Home from "../pages/Home";

export default function Allroutes() {
  return (
    <Box bg={"gray.500"}>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<PostList />} />
    </Routes>
    </Box>
  );
}
