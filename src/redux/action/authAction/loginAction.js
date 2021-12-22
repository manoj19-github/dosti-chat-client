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
    sessionStorage.setItem("dosti-account-info",JSON.stringify(data))
    dispatch({type:authTypes.LOGIN_SUCCESS,payload:data})
  }catch(err){
    dispatch({type:authTypes.LOGIN_FAILED})
  }
}

export const logoutAction=()=>dispatch=>{

  dispatch({type:authTypes.LOGOUT_REQUEST})

}
