import axios from "axios"
import {chatsTypes} from "../Types"
export const createGroupAction=(groupName,members)=>async(dispatch,getState)=>{
  try{
    const usersToken=getState().authReducer.userToken
    const config={
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${usersToken}`
      }
    }
    const payload={
      name:groupName,
      users:JSON.stringify(members.map((member)=>member._id))
    }
    const {data}=await axios.post("/api/chat/group/create",payload,config)
    console.log(`createGroup Action :`,data)
    dispatch({type:chatsTypes.CHAT_ADD,payload:data.groupChat})

  }catch(err){
    console.log(`error in createGroupAction : ${err}`)
    dispatch({type:chatsTypes.CHAT_FAILED})
  }
}
