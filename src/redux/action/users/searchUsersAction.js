import axios from "axios"
import {searchTypes} from "../Types"
export const searchUsersAction=(userReq)=>async(dispatch,getState)=>{
  try{
    const userToken=getState().authReducer.userToken
    const config={
      headers:{
        Authorization:`Bearer ${userToken}`
      }
    }
    dispatch({type:searchTypes.SEARCH_REQUEST})
    let {data}=await axios.get(`/api/user/chatUser?search=${userReq}`,config)
    dispatch({type:searchTypes.SEARCH_SUCCESS,payload:data})
  }catch(err){
    console.log(`err in searchUserToken : ${err}`)
    dispatch({type:searchTypes.SEARCH_FAILED,payload:err})
  }
}
