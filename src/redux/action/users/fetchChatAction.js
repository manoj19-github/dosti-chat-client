import axios from "axios"
import {chatsTypes} from "../Types"
export const fetchChatAction=()=>async (dispatch,getState)=>{
  dispatch({type:chatsTypes.CHAT_REQUEST})
  try{
    const userToken=getState().authReducer.userToken
    const config={
      headers:{
        Authorization:`Bearer ${userToken}`
      }
    }

    const {data}=await axios.get("/api/chat",config)
    dispatch({type:chatsTypes.CHAT_SUCCESS,payload:data.chatData})


  }catch(err){
    console.log(`error in chatAction  : ${err}`)
    dispatch({type:chatsTypes.CHAT_FAILED})
  }
}
