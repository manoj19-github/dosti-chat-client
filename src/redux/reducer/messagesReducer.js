import {messageTypes} from "../action/Types"
const initState={
  messages:[],
  loading:false,
  newMessage:[],
  newMessageLoading:false,
  isEmpty:false,
  error:null,

}
export const messagesReducer=(state=initState,action)=>{
  const {type,payload}=action
  switch(type){
    case messageTypes.ALL_MESSAGE_REQUEST:
      return{
        ...state,
        loading:true,
      }
    case messageTypes.ALL_MESSAGE_SUCCESS:
      return{
        ...state,
        loading:false,
        messages:payload
      }
    case messageTypes.ADD_NEW_MESSAGE_REQUEST:
      return{
        ...state,
        newMessageLoading:true,

      }
    case messageTypes.ADD_NEW_MESSAGE_SUCCESS:
      if(state.messages.length){
        //state.messages.push(payload)
        return{
          ...state,
          messages:[...state.messages,payload],
          newMessageLoading:false,
        }

      }else{
        return{
          ...state,
          newMessageLoading:false,
          messages:[{...payload}]
        }
      }

    case messageTypes.ADD_NEW_MESSAGE_ERROR:
      return{
        ...state,
        newMessageLoading:false,
        error:payload
      }
    default: return state
  }
}
