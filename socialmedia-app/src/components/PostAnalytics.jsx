import {
  Box,
  Flex,
  Text,
  Stack,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserAnalytics() {
  const [totalPosts, setTotalPosts] = useState(0);
  const [topPosts, setTopPosts] = useState([]);
  useEffect(() => {
    axios.get("https://light-kimono-yak.cyclic.app/analytics/posts").then((res) =>
      setTotalPosts(res.data)
    );
    axios.get("https://light-kimono-yak.cyclic.app/analytics/posts/top-liked").then(
      (res) => setTopPosts(res.data)
    );
    console.log(topPosts);
  }, []);
  return (
    <Box h={"100vh"}>
      <Flex
      direction={["column","column","row","row","row"]}
        boxSizing="border-box"
        p={["10px 10px", "15px 20px", "15px 25px", "20px 30px", "20px 30px"]}
        rounded={"xl"}
        m={"auto"}
        justifyContent={"space-evenly"}
        w={["90%", "70%", "40%", "50%", "60%"]}
        // h={"1000px"}
        bg={"white"}
        alignItems={"center"}
        gap={["10px", "15px", "20px", "25px", "30px"]}
      >
        <Box w={["90%","70%","50%","30%","30%"]}>
          <Stack
            h={"250px"}
            align={"center"}
            justifyContent={"center"}
            border={"5px solid darkgray"}
            rounded={"50%"}
          >
            <Heading>{totalPosts.TotalPosts}</Heading>
            <Text fontSize={"xl"} fontWeight={500}>
              Total number of posts
            </Text>
          </Stack>
        </Box>
        <Stack w={["90%","80%","70%","70%","70%"]} gap={"10px"}>
          <Heading mb={"20px"} textAlign={"center"}>
            Posts Analytics
          </Heading>
          {topPosts.map(e => 
                <Flex p={"10px"} border={"1px solid"} justifyContent={"space-between"} rounded={"lg"}>
                    <Text>Content: {e.content}</Text>
                    <Text>Like: {e.likes}</Text>
                </Flex>
                )}
        </Stack>
      </Flex>
    </Box>
  );
}
