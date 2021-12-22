import React,{useEffect} from 'react'
import {fetchChatAction} from "../redux/action/users/fetchChatAction"
import {useToast,Stack,Text} from "@chakra-ui/react"
import {Box} from "@chakra-ui/layout"
import {useSelector,useDispatch} from "react-redux"
import {Button} from "@chakra-ui/button"
import {AddIcon} from "@chakra-ui/icons"
import ChatLoading from "./misc/ChatLoading"
import {selectUsersAction} from "../redux/action/users/selectUsersAction"
import {getSender} from "../config/chatLogics"
import GroupChatModal from "./misc/GroupChatModal"
const MyChats = () => {
  const chatLoading=useSelector(state=>state.chatReducer.loading)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchChatAction())
  },[chatLoading,dispatch])
  const toast=useToast()
  const chatData=useSelector(state=>state.chatReducer.chatData)
  const selectChatResult=useSelector(state=>state.selectUserReducer.selectChatResult)
  const loggedUser=useSelector(state=>state.authReducer.userAccountData.sendUser)
  const handleChatClick=(chat)=>{
    const userId=chat.isGroupChat?chat._id:chat.users[0]._id===loggedUser._id? chat.users[1]._id :chat.users[0]._id
    dispatch(selectUsersAction(userId))
  }

    return (
      <Box
        d={{base:selectChatResult?"none":"flex",md:"flex"}}
        flexDirection="column"
        p={3}
        bg="white"
        w={{base:"100%",md:"31%"}}
        borderRadius="lg"
        borderWidth="1px"
      >
      <Box
        pb={2}
        px={3}
        fontSize={{base:"28px",md:"30px"}}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
      My Chats
      <GroupChatModal>
          <Button
            d="flex"
            fontSize={{base:"17px",md:'10px',lg:"17px"}}
            rightIcon={<AddIcon/>}
            >New Group Chat
          </Button>
      </GroupChatModal>
    </Box>
    <Box
      d="flex"
      flexDirection="column"
      p={3}
      bg="#f8f8f8"
      w="100%"
      h="100%"
      borderRadius="lg"
    >
    {
      chatData?(
        <Stack overflowY="scroll">
          {
            chatData.map((chat,index)=>(
              <Box
                onClick={()=>handleChatClick(chat)}
                cursor="pointer"
                bg={selectChatResult?._id === chat?._id?"#3882ac":"#e8e8e8"}
                color={selectChatResult?._id === chat?._id ?"white":"black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={index}
              >
                <Text>
                  {chat.isGroupChat?(chat.chatName):(
                    getSender(loggedUser,chat.users)
                  )}

                </Text>
              </Box>

            ))
          }


        </Stack>

      ):(
        <ChatLoading/>
      )
    }

    </Box>
  </Box>

    )
}

export default MyChats
