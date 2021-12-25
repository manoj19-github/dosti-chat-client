import {authTypes} from "../action/Types"

const authInitData={
  userAccountData:sessionStorage.getItem("dosti-account-info")?
                  JSON.parse(sessionStorage.getItem("dosti-account-info")):null,
  userToken:sessionStorage.getItem("dosti-account-info")?
                  JSON.parse(sessionStorage.getItem("dosti-account-info")).userToken:null,
  userId:sessionStorage.getItem("dosti-account-info")?
                  JSON.parse(sessionStorage.getItem("dosti-account-info")).userId:null,
  loading:false,
  error:''
}

export const authReducer=(state=authInitData,action)=>{
  const {type,payload}=action
  switch(type){
    case authTypes.LOGIN_REQUEST:
      return{
        ...state,
        loading:true
      }
    case authTypes.LOGIN_SUCCESS:
      return{
        ...state,
        loading:false,
        userToken:payload.userToken,
        userId:payload.userId,
        userAccountData:payload
      }
    case authTypes.LOGIN_FAILED:
      return{
        ...state,
        loading:false,
        error:payload
      }
    case authTypes.STAY_LOGGED:
      state.authReducer.userAccountData.sendUser.isOnline=true
      return state

    case authTypes.LOGOUT_REQUEST:
      return authInitData

    default : return state
  }
}
