import axios from "axios"
import {authTypes} from "../Types"
export const loginAction=(regData)=>async dispatch=>{
  try{
    dispatch({type:authTypes.LOGIN_REQUEST})
    const {data}=await axios.post(`/api/user/login`,regData,{
      headers:{
        "Content-Type":"application/json",
      },
    })
    console.log(data)

    sessionStorage.setItem("dosti-account-info",JSON.stringify(data))
    dispatch({type:authTypes.LOGIN_SUCCESS,payload:data})
  }catch(err){
    dispatch({type:authTypes.LOGIN_FAILED})
  }
}

export const logoutAction=()=>async(dispatch,getState)=>{

  try{
    const userId=getState().authReducer.userAccountData.sendUser._id

    const {data}=await axios.post(
      `/api/user/logout`,
      {userId},
      {
        headers:{
          "Content-Type":"application/json",
        },
    })

    dispatch({type:authTypes.LOGOUT_REQUEST})
  }catch(err){
    console.log(`something went wrong in logout action`)
  }
}
