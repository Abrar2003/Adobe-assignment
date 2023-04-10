import {
  Box,
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserAnalytics() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [topUsers, setTopUsers] = useState([]);
  useEffect(() => {
    axios
      .get("https://light-kimono-yak.cyclic.app/analytics/users")
      .then((res) => setTotalUsers(res.data));
    axios
      .get("https://light-kimono-yak.cyclic.app/analytics/users/top-active")
      .then((res) => setTopUsers(res.data));
    console.log(topUsers);
  }, []);
  return (
    <Box h={"100vh"}>
      <Flex
        direction={["column", "column", "row", "row", "row"]}
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
        <Box w={["90%", "70%", "50%", "30%", "30%"]}>
          <Stack
            h={"250px"}
            align={"center"}
            justifyContent={"center"}
            border={"5px solid darkgray"}
            rounded={"50%"}
          >
            <Heading>{totalUsers.TotalUsers}</Heading>
            <Text fontSize={"xl"} fontWeight={500}>
              Total number of users
            </Text>
          </Stack>
        </Box>

        <Stack w={["90%", "80%", "70%", "70%", "70%"]}>
          <Heading mb={"20px"} textAlign={"center"}>
            User Analytics
          </Heading>
          {topUsers.map(e => 
            <Box key={e._id} p={"0.5rem 1rem"} border={"1px solid"} rounded={"lg"}>
                <Text>Name: {e.name}</Text>
                <Text>Email: {e.email}</Text>
                <Text>Bio: {e.bio}</Text>
            </Box>
            )}
        </Stack>
      </Flex>
    </Box>
  );
}
