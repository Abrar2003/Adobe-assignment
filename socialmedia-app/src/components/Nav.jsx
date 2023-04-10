import { Flex, Text, Button } from "@chakra-ui/react";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { DiGoogleAnalytics } from "react-icons/di";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <Flex
    boxSizing="border-box"
    p={"10px 0"}
      h={"60px"}
      w={"100%"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
      color={"#000035"}
    >
      <Link to={"/"}>
        <Button p={["2px", "7px", "10px", "15px", "20px"]}> 
          <Flex
            fontSize={["xs", "md", "l", "xl", "xl"]}
            gap={["5px", "10px", "15px", "20px", "20px"]}
            align={"center"}
          >
            <Text>Home </Text>
            <AiFillHome />
          </Flex>
        </Button>
      </Link>
      <Link to={"/analytics"}>
        <Button p={["2px", "7px", "10px", "15px", "20px"]}>
          <Flex
            fontSize={["xs", "md", "l", "xl", "xl"]}
            align={"center"}
            gap={["5px", "10px", "15px", "20px", "20px"]}
          >
            <Text>Analytics</Text>
            <DiGoogleAnalytics />
          </Flex>
        </Button>
      </Link>
      <Link to={"/forms"}>
        <Button p={["1px 2px", "5px 7px", "7px 10px", "10px 15px", "15px 20px"]}>
          <Flex
            fontSize={["xs", "md", "l", "xl", "xl"]}
            align={"center"}
            gap={["5px", "10px", "15px", "20px", "20px"]}
          >
            <Text>New Post/User</Text>
            <BsFillPlusSquareFill />
          </Flex>
        </Button>
      </Link>
    </Flex>
  );
}
