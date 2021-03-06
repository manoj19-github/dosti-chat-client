import {chatsTypes} from "../action/Types"

const initChat={
  loading:false,
  chatData:null,
  newChatAdded:false,
  chatRenamed:false,
  error:null
}

export const chatReducer=(state=initChat,action)=>{


    const {type,payload}=action

  switch(type){
    case chatsTypes.CHAT_REQUEST:
      return{
        ...state,
        lodaing:true,

      }
    case chatsTypes.CHAT_SUCCESS:
      return{
        ...state,
        loading:false,
        chatData:payload
      }
  case chatsTypes.CHAT_MEMBER_UPDATE:
    if(state.chatData){
      state.chatData.forEach(cdata=>{
          if(cdata._id===payload._id){
            cdata={...payload}
          }
        })

    }
    return state

  case chatsTypes.CHAT_DELETE:
  if(state.chatData){
    let filterData=state.chatData.filter(cdata=>cdata._id !== payload._id)
    return{
      ...state,
      chatData:[...filterData]
    }
  }
  return state

  case chatsTypes.CHAT_GROUP_RENAME:
    if((state.chatData)){
      state.chatData.forEach((cdata,index)=>{
        if(cdata._id===payload._id){
          cdata.chatName=payload.chatName
        }
      })
    return {
      ...state,
      loding:false,
      chatRenamed:true,
    }
  }
  else return state

  case chatsTypes.CHAT_ADD:
    if((state.chatData) &&  (!state.chatData.find((c)=>c._id===payload._id))){
      return{
        ...state,
        loading:false,
        newChatAdded:true,
        chatData:[payload,...state.chatData]
      }
    }
    else return state
  case chatsTypes.UPDATE_LATEST_MESSAGE:
    let updatechat=state.chatData.map(chat=>{
      if(chat._id===payload.chat._id){
        chat.latestMessage=payload
      }
      return chat
    })

    return{
      ...state,
      chatData:updatechat
    }
  case chatsTypes.CHAT_FAILED:
      return{
        ...state,
        loading:false,
        error:payload,
        newChatAdded:false,
        chatRenamed:false
      }
  case chatsTypes.CHAT_USER_LOGIN:

    if(state.chatData && state.chatData.length){
      state.chatData.forEach((chat)=>{
          if(!chat.isGroupChat){
            chat.users.forEach(user=>{
              if(user._id===payload){
                user.isOnline=true
              }
              return user
            })
          }
          return chat
        }

      )
    }

    return state

  case chatsTypes.CHAT_USER_LOGOUT:
      if(state.chatData && state.chatData.length){
        state.chatData.forEach((chat)=>{
            if(!chat.isGroupChat){
              chat.users.forEach(user=>{
                if(user._id===payload){
                  user.isOnline=false
                }
                return user
              })
            }
            return chat
          }
        )

      }
    return state
    
    default: return state
  }
}
