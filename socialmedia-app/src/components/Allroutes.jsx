import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Home from "../pages/Home";
import Forms from "../pages/Forms";
import Analytics from "../pages/Analytics";

export default function Allroutes() {
  return (
    <Box bg={"gray.500"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Box>
  );
}
