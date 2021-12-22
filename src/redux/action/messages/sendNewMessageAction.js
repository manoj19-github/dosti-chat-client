import {messageTypes} from "../Types"
import axios from "axios"

const sendNewMessageAction=(content,chatId,socket)=>async(dispatch,getState)=>{
  try{
    const userToken=getState().authReducer.userToken
    const config={
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${userToken}`
      }
    }
    const payload={content,chatId}
    dispatch({type:messageTypes.ADD_NEW_MESSAGE_REQUEST})
    const {data}=await axios.post(`/api/messages`,payload,config)
    socket.emit("newMessage",data.message)
    dispatch({
      type:messageTypes.ADD_NEW_MESSAGE_SUCCESS,
      payload:data.message
    })


  }catch(err){
    console.log(`something went wrong in sendNewMessage Action `,err)
    dispatch({type:messageTypes.ADD_NEW_MESSAGE_ERROR})
  }
}
export default sendNewMessageAction
