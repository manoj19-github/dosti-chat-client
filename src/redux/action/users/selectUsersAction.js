import axios from "axios"
import {selectChatTypes,chatsTypes} from "../Types"
export const selectUsersAction=(userId)=>async(dispatch,getState)=>{
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
  }catch(err){
    console.log(`err in selectUsersAction : ${err}`)
    dispatch({type:selectChatTypes.ACCESS_FAILED,payload:err})
  }
}
