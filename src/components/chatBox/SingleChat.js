import React,{useState,useEffect,useRef} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {
  Box,Text,Spinner,
  FormControl,Input,Button
} from "@chakra-ui/react"
import {selectChatTypes} from "../../redux/action/Types"
import{ArrowBackIcon} from "@chakra-ui/icons"
import IdleTimer from "react-idle-timer"
import{IconButton} from "@chakra-ui/button"
import {getSender,getSenderData} from "../../config/chatLogics"
import ProfileModel from "../misc/ProfileModel"
import UpdateGroupChatModal from "../misc/UpdateGroupChatModal"
import {IoMdSend} from "react-icons/io"
import {AiOutlineClose} from "react-icons/ai"
import sendNewMessageAction from "../../redux/action/messages/sendNewMessageAction"
import fetchAllMessagesAction from "../../redux/action/messages/fetchAllMessagesAction"
import ScrollableChat from "./ScrollableChat"
import {BsEmojiSmile} from "react-icons/bs"
import Picker from "emoji-picker-react"
import io from "socket.io-client"
import {messageTypes,notificationTypes,chatsTypes} from "../../redux/action/Types"
import Lottie from "react-lottie"
import {logoutAction} from "../../redux/action/authAction/loginAction"
import animationData from "../../anim/typing.json"

import "../../components/mystyles.css"

const SERVER_URL=`${process.env.REACT_APP_SERVER_URL}`
var socket,selectedChatCompare


const SingleChat = () => {

  const messageInputRef=useRef(null)
  const [socketConnected,setSocketConnected]=useState(false)
  const [typing,setTyping]=useState(false)
  const [isTyping,setIsTyping]=useState(false)
  const [chooseEmoji,setChooseEmoji]=useState(null)

  const [showEmoji,setShowEmoji]=useState(false)

  const [newMessage,setNewMessage]=useState("")
  const dispatch=useDispatch()
  const selectedChat=useSelector(state=>state.selectUserReducer.selectChatResult)
  const selectedChatLoading=useSelector(state=>state.selectUserReducer.loading)
  const authUser=useSelector(state=>state.authReducer.userAccountData.sendUser)
  const messageLoading=useSelector(state=>state.messagesReducer.loading)
  const newMessageLoading=useSelector(state=>state.messagesReducer.newMessageLoading)

  const notifyData=useSelector(state=>state.notifyReducer.notifyData)
  const chatData=useSelector(state=>state.chatReducer.chatData)

  // defaultOptions for lottie
  const defaultOptions={
    loop:true,
    autoplay:true,
    animationData:animationData,
    renderSettings:{
      preserveAspectRatio:"xMidYMid slice",
    }

  }

  // socket configuration for client side
  useEffect(()=>{

    socket=io(SERVER_URL)
    socket.emit("setup",authUser)
    socket.on("connected",()=>{
      setSocketConnected(true)
    })
    socket.on("typing",()=>{
      setIsTyping(true)
    })
    socket.on("stopTyping",()=>{
      setIsTyping(false)
    })

  },[])
  console.log("chatData",chatData)
  useEffect(()=>{
    let loggedData={chatData,authUser}
     socket.emit("userLogin",loggedData)
    window.addEventListener("beforeunload",(e)=>{
      e.preventDefault()
      e.returnValue=""
      dispatch(logoutAction())
      sessionStorage.removeItem("dosti-account-info")
      socket.emit("userLogout",loggedData)
    })
  },[dispatch,chatData,selectedChat])



    const handleSendMessage=(event)=>{
      // if you press enter key or send button and if you type anything on message box then message will be send

      if(event.key==="Enter"&& newMessage){
        const throwMessage=newMessage
        setNewMessage("")
        dispatch(sendNewMessageAction(throwMessage,selectedChat._id,socket))  // network call for message send
        socket.emit("stopTyping",selectedChat._id)

      }
    }
    // method for sending message through button
    const SendMessageFromBtn=()=>{
      if(!newMessage) return
      const throwMessage=newMessage
      setNewMessage("")
      dispatch(sendNewMessageAction(throwMessage,selectedChat._id,socket))  // network call for message send
      socket.emit("stopTyping",selectedChat._id)
    }

    //  logic for typing indicator

    const handleTyping=(event)=>{
      setNewMessage(event.target.value)
      // Typing indicator logic
      if(!socketConnected) return
      if(!typing){
        setTyping(true)
        socket.emit("typing",selectedChat._id)
      }
      var lastTypingTime=new Date().getTime()
      var timerLength=3000
      setTimeout(()=>{
        var timeNow=new Date().getTime()
        var timeDiff=timeNow-lastTypingTime
        if(timeDiff>=timerLength && typing){
          socket.emit("stopTyping",selectedChat._id)
          setTyping(false)
        }

      },timerLength)



    }

    //  logic for emoji click

    const handleEmojiClick=(event,emojiObject)=>{
      const cursor=messageInputRef.current.selectionStart
      const text=newMessage.slice(0,cursor)
        +emojiObject.emoji+newMessage.slice(cursor)
      setNewMessage(text)
    }



    //  fetchAllMessage

    useEffect(()=>{
      dispatch(fetchAllMessagesAction(selectedChat,socket))

      selectedChatCompare=selectedChat
    },[dispatch,selectedChat])

    // real-time message get

    useEffect(()=>{
      socket.on("messageReceived",(newMessageReceived)=>{
          if(!selectedChatCompare ||
          selectedChatCompare._id!=  newMessageReceived.chat._id
        ){
          // give notification
          if(!notifyData.includes(newMessageReceived)){
            dispatch({
              type:notificationTypes.NOTIFY_SUCCESS,
              payload:newMessageReceived
            })
            dispatch({
              type:chatsTypes.UPDATE_LATEST_MESSAGE,
              payload:newMessageReceived
            })
             dispatch({
                type:chatsTypes.CHAT_ADD,
                payload:newMessageReceived.chat
             })
            localStorage.removeItem("dosti-chat-notifyData")
            if(notifyData.length)
            localStorage.setItem("dosti-chat-notifyData",JSON.stringify(notifyData))
          }

        }else{

          dispatch({
            type:messageTypes.ADD_NEW_MESSAGE_SUCCESS,
            payload:newMessageReceived
          })
          dispatch({
            type:chatsTypes.UPDATE_LATEST_MESSAGE,
            payload:newMessageReceived
          })
        }
    })
    socket.on("userLogged",(userId)=>{
      dispatch({type:chatsTypes.CHAT_USER_LOGIN,payload:userId})
    })
    socket.on("userLoggedOut",(userId)=>{
      dispatch({type:chatsTypes.CHAT_USER_LOGOUT,payload:userId})
    })



  },[dispatch])

    return (
        <>

          {
            selectedChat?(
              <>
                  <Text
                    fontSize={{base:"28px",md:"30px"}}
                    px={4}
                    w="100%"
                    fontFamily="Work sans"
                    d="flex"
                    justifyContent={{base:"space-between"}}
                    alignItems="center"
                  >
                  <IconButton
                    d={{base:"flex",md:"none"}}
                    icon={<ArrowBackIcon/>}
                    onClick={()=>dispatch({type:selectChatTypes.ACCESS_FINISHED})}
                  />

                  {selectedChat.isGroupChat?(
                    <>
                      {selectedChat.chatName.toUpperCase()}
                      <UpdateGroupChatModal/>

                    </>

                  ):(
                    <>
                      {getSender(authUser,selectedChat.users)}
                      <ProfileModel user={getSenderData(authUser,selectedChat.users)}/>
                    </>
                  )}
                </Text>


                  <Box
                    d="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                    p={3}
                    bg="#e8e8e8"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflowY="hidden"

                    >

                  {/* messages here */}
                  {
                      messageLoading?(
                        <Spinner
                          size="xl"
                          w={20}
                          h={20}
                          alignSelf="center"
                          margin="auto"
                        />
                      ):(
                        <div className="messages" >
                          <ScrollableChat/>
                        </div>
                      )
                  }
                  <Box>  {showEmoji&&  <Picker onEmojiClick={handleEmojiClick}/>}</Box>
                  {/* messages end */}
                  {isTyping ?
                    <div>
                      <Lottie
                        options={defaultOptions}
                        width={50}
                        style={{marginBottom:2,marginLeft:0}}

                      />
                    </div>:<></>}

                  <FormControl
                    onKeyDown={handleSendMessage}

                    isRequired
                    mt={3}
                    d="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >


                  <Box mx={{base:"5px",md:"7px"}} cursor="pointer" onClick={()=>setShowEmoji(!showEmoji)}>

                  {!showEmoji? <BsEmojiSmile size={24}/>:<AiOutlineClose size={24}/>}
                </Box>
                  <Input
                    variant="filled"
                    bg="#e0e0e0"
                    placeholder="Enter A Message"
                    onChange={handleTyping}
                    value={newMessage}
                    ref={messageInputRef}

                    />
                    <Box
                      mx={2}
                      cursor="pointer"
                      onClick={SendMessageFromBtn}
                    >
                    <IoMdSend size={25} />
                  </Box>
                  </FormControl>
                  </Box>

              </>
            ):(
              <Box
                d="flex"
                alignItems="center"
                justifyContent="center"
                h="100%"
                color="gray"
              >
              <Text fontSize="3xl" pb={2}>Click a user to start Chatting</Text>
              </Box>
          )
        }
        </>

  )
}

export default SingleChat
