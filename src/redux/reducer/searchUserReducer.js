import {searchTypes} from "../action/Types"
const initSearchUser={
  loading:false,
  error:'',
  userResult:null
}
export const searchUserReducer=(state=initSearchUser,action)=>{
  const {type,payload}=action
  switch(type){
    case searchTypes.SEARCH_REQUEST:
      return{
        ...state,
        loading:true

      }
    case searchTypes.SEARCH_SUCCESS:
      return{
        ...state,
        loading:false,
        userResult:payload
      }
    case searchTypes.SEARCH_FAILED:
      return{
        ...state,
        loading:false,
        error:payload
      }
    case searchTypes.SEARCH_COMPLETE:
      return initSearchUser
    default:return state
  }
}
