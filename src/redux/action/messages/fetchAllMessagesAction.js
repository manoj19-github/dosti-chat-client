import {messageTypes} from "../Types"
import axios from "axios"

const fetchAllMessagesAction=(chatReceiver,socket)=>async(dispatch,getState)=>{
  try{
    const chatId=chatReceiver?._id
    if(!chatId) return
    const userToken=getState().authReducer.userToken
    const config={
      headers:{
        Authorization:`Bearer ${userToken}`
      }
    }
    dispatch({type:messageTypes.ALL_MESSAGE_REQUEST})
    const {data}=await axios.get(`/api/messages/${chatId}`,config)
    console.log(`data from fetchMessages`,data)
    dispatch({type:messageTypes.ALL_MESSAGE_SUCCESS,payload:data.messages})
    socket.emit("joinChat",chatId)
  }catch(err){
    dispatch({type:messageTypes.ALL_MESSAGE_ERROR})
    console.log(`error in fetchAllMessagesAction `,err)
  }
}
export default fetchAllMessagesAction
