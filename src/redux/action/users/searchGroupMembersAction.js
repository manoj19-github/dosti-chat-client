import axios from "axios"
import {MembersRequestTypes} from "../Types"
export const searchGroupMembersAction=(query)=>async(dispatch,getState)=>{
  try{
    const userToken=getState().authReducer.userToken
    const config={
      headers:{
        Authorization:`Bearer ${userToken}`
      }
    }
    dispatch({type:MembersRequestTypes.MEMBER_REQUEST})
    const {data}=await axios.get(`/api/user/chatUser?search=${query}`,config)
    dispatch({type:MembersRequestTypes.MEMBER_SUCCESS,payload:data.users})
  }catch(err){
    console.log(`error in searchGroupMembers : error ${err}`)
    dispatch({type:MembersRequestTypes.MEMBER_FAILED,payload:err})
  }

}
