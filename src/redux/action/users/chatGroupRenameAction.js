import axios from "axios"
import {ChatGroupTypes,selectChatTypes} from "../Types"
import {chatsTypes} from "../Types"
export const GroupRenameAction=(newName,groupId)=>async(dispatch,getState)=>{
  try{
    const userToken=getState().authReducer.userToken
    const payload={
      chatId:groupId,chatName:newName
    }
    const config={
      headers:{
        Authorization:`Bearer ${userToken}`
      }
    }
    dispatch({type:chatsTypes.CHAT_REQUEST})
    const {data}=await axios.put(`api/chat/group/rename`,payload,config)
    dispatch({type:chatsTypes.CHAT_GROUP_RENAME,payload:data.updatedData})
    dispatch({type:selectChatTypes.ACCESS_SUCCESS,payload:data.updatedData})

  }catch(err){
    console.log(`error in chatgroup rename function `,err)
    dispatch({type:chatsTypes.CHAT_FAILED})
  }
}
