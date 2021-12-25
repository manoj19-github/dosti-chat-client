import axios from "axios"
import {selectChatTypes,chatsTypes,notificationTypes} from "../Types"
export const selectUsersAction=(userId)=>async(dispatch,getState)=>{
  const notifyData=getState().notifyReducer.notifyData
  console.log(`user id for select : `,userId)
  try{
    const userToken=getState().authReducer.userToken
    const config={
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${userToken}`
      }
    }

    dispatch({type:selectChatTypes.ACCESS_REQUEST})
    let {data:{ChatData}}=await axios.post(`/api/chat`,{userId},config)
    dispatch({type:selectChatTypes.ACCESS_SUCCESS,payload:ChatData})
    dispatch({type:chatsTypes.CHAT_REQUEST})
    dispatch({type:chatsTypes.CHAT_ADD,payload:ChatData})
    dispatch({
      type:notificationTypes.NOTIFY_RESET,
      payload:ChatData
    })
    if(!notifyData.length){
      localStorage.getItem("dosti-chat-notifyData") &&
      localStorage.removeItem("dosti-chat-notifyData")
    }
    if(notifyData.length>1)
      localStorage.setItem("dosti-chat-notifyData",JSON.stringify(notifyData))


  }catch(err){
    console.log(`err in selectUsersAction : ${err}`)
    dispatch({type:selectChatTypes.ACCESS_FAILED,payload:err})
  }
}
