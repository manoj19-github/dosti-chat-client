import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import {Box} from "@chakra-ui/react"
import SingleChat from "./chatBox/SingleChat"
const ChatBox = () => {
  const selectedChat=useSelector(state=>state.selectUserReducer.selectChatResult)
    return (
        <Box
          d={{base:selectedChat?"flex":"none",md:"flex"}}
          alignItems="center"
          flexDirection="column"
          p={3}
          bg="white"
          w={{base:"100%",md:"68%"}}
          borderRadius="lg"
          borderWidth="1px"
          >
          <SingleChat/>
        </Box>
    )
}

export default ChatBox
