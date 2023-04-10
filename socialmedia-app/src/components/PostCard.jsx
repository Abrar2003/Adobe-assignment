import { Box,
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
  useDisclosure, } from "@chakra-ui/react";
import { AiFillLike, AiFillDislike, AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PostCard({ id, username, deletePost }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [liked, setLiked] = useState(0);
  const [post, setPost] = useState({});
  const [updatedPost, setUpdatedPost] = useState({
    content: post.content
  })
  useEffect(() => {
    axios(`https://light-kimono-yak.cyclic.app/posts/${id}`).then((res) =>
      setPost(res.data)
    );
  }, [liked]);

  const shadow = {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
  };
  const like = async () => {
    if (!liked) {
      await axios.post(`https://light-kimono-yak.cyclic.app/posts/${id}/like`);
      setLiked(1);
    }
    else{
        alert("You can only like a post once")
    }
  };
  const dislike = async () => {
    if(liked){
        await axios.post(`https://light-kimono-yak.cyclic.app/posts/${id}/unlike`);
        setLiked(0);
    }
    else{
        alert("You can only dislike a post once");
    }
  };
  const onChange = (val)=>{
    setUpdatedPost({
      ...updatedPost,
      content: val
    })
  };
  const onSubmit = async () => {
    await axios.put(`https://light-kimono-yak.cyclic.app/posts/${id}`, updatedPost);
    axios(`https://light-kimono-yak.cyclic.app/posts/${id}`).then((res) =>
      setPost(res.data)
    );
    onClose();
  }
  return (
    <Stack
    color={"white"}
    gap={"15px"}
      justifyContent={"space-between"}
      rounded={"lg"}
      bg={"gray.700"}
      p={["1rem 1rem", "1rem 1.5rem", "1rem 2rem", "1rem 2rem"]}
      style={shadow}
    >
      <Text fontSize={"xl"}>Name: {username}</Text>
      <Text fontSize={"l"}>Content: {post.content}</Text>
      <Text fontSize={"l"}>Likes: {post.likes}</Text>
      <Flex gap={"20px"}>
        <Button bg={"blue.400"} onClick={like} disabled={liked}>
          <AiFillLike />
        </Button>
        <Button bg={"blue.400"} onClick={dislike} disabled={!liked || post.likes == 0}>
          <AiFillDislike />
        </Button>
      </Flex>
      <Flex gap={"20px"} alignItems={"center"}>
        <Button bg={"blue.400"} onClick={onOpen}>
          <Text mr={"10px"}>Edit</Text>
          <FiEdit />
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormLabel>Content</FormLabel>
              <Textarea
                type={"text"}
                name="content"
                maxLength={300}
                defaultValue={post.content}
                onChange={(e) => onChange(e.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" onClick={() => onSubmit()} mr={3}>
                Submit
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancle
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Button bg={"red"} onClick={()=>deletePost(id)}>
          <Text mr={"10px"}>Delete</Text>
          <AiOutlineDelete />
        </Button>
      </Flex>
    </Stack>
  );
}
