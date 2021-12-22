import React from 'react'
import {useSelector} from "react-redux"
import ScrollableFeed from "react-scrollable-feed"
import {
  isLastMessage,isSameSender,
  isSameSenderMargin,isSameUser
} from "../../config/chatLogics"
import {Tooltip,Avatar} from "@chakra-ui/react"
const ScrollableChat = ({messageData}) => {
  const loggedUser=useSelector(state=>state.authReducer.userAccountData.sendUser)
    return (
      <ScrollableFeed>
      {
        messageData &&
        messageData.map((msg,i)=>(
          <div style={{display:"flex"}} key={msg._id}>
          {
              (isSameSender(messageData,msg,i,loggedUser._id)||
              isLastMessage(messageData,i,loggedUser._id)
            )&&(
            <Tooltip
              label={msg.sender.name}
              placement="bottom-start"
              hasArrow
            >
            <Avatar
              mt="7px"
              mr={1}
              size="sm"
              cursor="pointer"
              name={msg.sender.name}
              src={msg.sender.pic}
              />
            </Tooltip>

          )}
          <span
          style={{backgroundColor:`${
            msg.sender._id===loggedUser._id ?"#bee3f8":"#03a9f4"
          }`,
          borderRadius:"20px",
          padding:"5px 15px",
          maxWidth:"55%",
          marginLeft:isSameSenderMargin(messageData,msg,i,loggedUser._id),
          marginTop:isSameUser(messageData,msg,i)?"5px":"10px"
        }}
          >
          {msg.content}
          </span>
          </div>

        ))
      }
      </ScrollableFeed>
    )
}

export default ScrollableChat
