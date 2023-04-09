import {
  Flex,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { DiGoogleAnalytics } from "react-icons/di";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";


export default function Nav() {
  
  return (
    <Flex
      h={"60px"}
      w={"100%"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
      color={"#000035"}
    >
      <Link to={"/home"}>
        <Flex fontSize={["xs", "md", "l", "xl", "xl"]} gap={["5px","10px","15px","20px","20px"]} align={"center"}>
          <Text>Home </Text>
          <AiFillHome />
        </Flex>
      </Link>
      <Link to={"/analytics"}>
        <Flex fontSize={["xs", "md", "l", "xl", "xl"]} align={"center"} gap={["5px","10px","15px","20px","20px"]}>
          <Text>Analytics</Text>
          <DiGoogleAnalytics />
        </Flex>
      </Link>
      <Link to={"/"}>
      <Flex fontSize={["xs", "md", "l", "xl", "xl"]} align={"center"} gap={["5px","10px","15px","20px","20px"]}>
        <Text>
          New Post/User 
        </Text>
        <BsFillPlusSquareFill />
      </Flex>
      </Link>
    </Flex>
  );
}
