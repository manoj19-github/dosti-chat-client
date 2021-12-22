import axios from "axios"
import {chatsTypes,selectChatTypes} from "../Types"
export const removeToGroupAction=(userId,chatId)=>async(dispatch,getState)=>{
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
    const {data}=await axios.put(`api/chat/group/remove`,payload,config)
    console.log(`for remove group`,data)
    if(data.groupDeleted){
      dispatch({type:selectChatTypes.ACCESS_FINISHED})
      dispatch({type:chatsTypes.CHAT_DELETE,payload:data.updatedData})

    }else{
      dispatch({type:chatsTypes.CHAT_MEMBER_UPDATE,payload:data.updatedData})
      dispatch({type:selectChatTypes.ACCESS_SUCCESS,payload:data.updatedData})

    }

  }catch(err){
    console.log(`err in removeToGroupAction `,err)
    dispatch({type:chatsTypes.CHAT_FAILED,payload:err})
  }

}
