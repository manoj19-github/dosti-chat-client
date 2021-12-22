import React,{useEffect,useContext} from 'react'
import {useHistory} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import {
  Box,Container,Text,
  Tab,TabList,
  TabPanels,TabPanel,Tabs
 } from "@chakra-ui/react"
import Login from "../components/Auth/Login"
import Signup from "../components/Auth/Signup"

const Homepage = () => {
  const userToken=useSelector(state=>state.authReducer.userToken)
  const history=useHistory()
    return (
      <Container maxW='xl' centerContent
      >
        <Box
          d="flex"
          justifyContent="center"
          bg={"white"}
          w="100%"
          m="10px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
        <Text
          fontSize="4xl"
          fontFamily="Roboto"
          color="gray.500"
          fontWeight="bold"

          >Dosti</Text>
        </Box>
        <Box
          bg="white"
          w="100%"
          p={4}
          borderRadius="lg"
          borderWidth="1px"
          color="black"
        >
        <Tabs variant='soft-rounded'>
          <TabList d="flex" justifyContent="space-around" mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <h1 style={{color:"black",fontSize:"25px"}} >
        Presented By Santra Developers</h1>
  </Container>
    )
}

export default Homepage
