import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

export default function UserCard({ id, deleteUser }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({});
  const cancelRef = useRef();
  const initialUser = {
    name: user.name,
    bio: user.bio,
  };
  const [newUser, setNewUser] = useState(initialUser);

  useEffect(() => {
    axios
      .get(`https://light-kimono-yak.cyclic.app/users/${id}`)
      .then((res) => setUser(res.data));
  }, []);

  const onChange = (e) => {
    const { name: key, value } = e.target;
    setNewUser({
      ...newUser,
      [key]: value,
    });
  };
  const onSubmit = async () => {
    await axios.put(`https://light-kimono-yak.cyclic.app/users/${id}`, newUser);
    axios
      .get(`https://light-kimono-yak.cyclic.app/users/${id}`)
      .then((res) => setUser(res.data));
    onClose();
  };
  const shadow = {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  };
  
  return (
    <Stack
      gap={"20px"}
      rounded={"lg"}
      bg={"gray.700"}
      p={["1rem 1rem", "1rem 1.5rem", "1rem 2rem", "1rem 2rem"]}
      style={shadow}
    >
      <Text fontSize={"xl"}>Name: {user.name}</Text>
      <Text fontSize={"l"}>Eamil: {user.email}</Text>
      <Text fontSize={"l"}>Bio: {user.bio}</Text>
      <Flex gap={"20px"} alignItems={"center"}>
        <Button onClick={onOpen}>
          <Text mr={"10px"}>Edit</Text>
          <FiEdit />
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormLabel>Name</FormLabel>
              <Input
                mb={"10px"}
                type="text"
                name="name"
                defaultValue={user.name}
                onChange={(e) => onChange(e)}
              />
              <FormLabel>Bio</FormLabel>
              <Textarea
                type={"text"}
                name="bio"
                maxLength={200}
                defaultValue={user.bio}
                onChange={(e) => onChange(e)}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onSubmit}>
                Submit
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancle
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Button bg={"red"}>
          <Text mr={"10px"} onClick={() => deleteUser(id)}>Delete</Text>
          <AiOutlineDelete />
        </Button>
      </Flex>
    </Stack>
  );
}
