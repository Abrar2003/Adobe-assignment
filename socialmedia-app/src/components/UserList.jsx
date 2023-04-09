import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Grid } from "@chakra-ui/react";
import axios from "axios";
import UserCard from "./UserCard";

export default function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("https://light-kimono-yak.cyclic.app/users")
    .then(res => setUsers(res.data));
  }, []);
  const deleteUser = async (id) => {
    alert("You are deleting this User");
    await axios.delete(`https://light-kimono-yak.cyclic.app/users/${id}`);
    axios.get("https://light-kimono-yak.cyclic.app/users")
    .then(res => setUsers(res.data));
  };
  return (
    <Grid
      m={"auto"}
      justifyContent={"center"}
      w={["90%", "70%", "40%", "50%", "60%"]}
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
      ]}
      gap={"30px"}
    >
      {users.map((e) => (
        <UserCard key={e._id} id={e._id} deleteUser={deleteUser} />
      ))}
    </Grid>
  )
}
