import {selectChatTypes} from "../action/Types"
const initAccessUser={
  loading:false,
  error:null,
  selectChatResult:null
}
export const selectUserReducer=(state=initAccessUser,action)=>{
  const {type,payload}=action
  switch(type){
    case selectChatTypes.ACCESS_REQUEST:
      return{
        ...state,
        loading:true

      }
    case selectChatTypes.ACCESS_SUCCESS:
      return{
        ...state,
        loading:false,
        selectChatResult:payload
      }
    case selectChatTypes.ACCESS_FAILED:
      return{
        ...state,
        loading:false,
        error:payload
      }
    case selectChatTypes.ACCESS_FINISHED:
      return{
        ...state,
        loading:false,
        selectChatResult:null
      }
    default:return state
  }
}
