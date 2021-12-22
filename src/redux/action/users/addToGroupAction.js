import axios from "axios"
import {chatsTypes,selectChatTypes} from "../Types"
export const addToGroupAction=(userId,chatId)=>async(dispatch,getState)=>{
  try{
      const payload={
        chatId,userId
      }
    const userToken=getState().authReducer.userToken
    const config={
      headers:{
        Authorization:`Bearer ${userToken}`
      }
    }
    dispatch({type:chatsTypes.CHAT_REQUEST})
    const {data}=await axios.put(`api/chat/group/add`,payload,config)
    dispatch({type:chatsTypes.CHAT_MEMBER_UPDATE,payload:data.updatedData})
    dispatch({type:selectChatTypes.ACCESS_SUCCESS,payload:data.updatedData})
  }catch(err){
    dispatch({type:chatsTypes.CHAT_FAILED,payload:err})
  }

}
