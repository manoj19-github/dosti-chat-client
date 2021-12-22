import React,{useEffect} from "react"
import {useHistory} from "react-router-dom"
import {Box} from "@chakra-ui/layout"
import {useToast} from "@chakra-ui/react"
import SideDrawer from "../components/misc/SideDrawer"
import MyChats from "../components/MyChats"
import ChatBox from "../components/ChatBox"
import {useDispatch,useSelector} from "react-redux"

const Chatpage=()=>{
  const toast=useToast()
  const dispatch=useDispatch()
  const userToken=useSelector(state=>state.authReducer.userToken)
  const selectChatLoading=useSelector(state=>state.selectUserReducer.loading)
  const selectChatResult=useSelector(state=>state.selectUserReducer.selectChatResult)
  const history=useHistory()

  return(
    <div style={{width:"100%"}}>
      {userToken && <SideDrawer/> }
      <Box
        d="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="1"
        >

         {userToken && <MyChats/> }
         {userToken && <ChatBox/> }
      </Box>
    </div>
  )
}
export default Chatpage
