import { Box, Text } from "@chakra-ui/react";
import Allroutes from './components/Allroutes';
import Nav from "./components/Nav";


function App() {
  return (
    <Box bg={"gray.400"}>
      <Nav />
      <Allroutes />
    </Box>
  );
}

export default App;
