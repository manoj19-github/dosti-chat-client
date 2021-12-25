import {notificationTypes} from "../action/Types"
const initState={
  notifyData:localStorage.getItem("dosti-chat-notifyData")?
             JSON.parse(localStorage.getItem("dosti-chat-notifyData")):
             []
}

export const notifyReducer=(state=initState,action)=>{
  const{type,payload}=action
  switch(type){
    case notificationTypes.NOTIFY_SUCCESS:
      if(state.notifyData.length){
        return{
          notifyData:[payload,...state.notifyData]
        }
      }else{
        return{
          notifyData:[payload]
        }
      }
    case notificationTypes.NOTIFY_RESET:
      var filterNotifyData=[]
      if(state.notifyData.length){
        filterNotifyData=state.notifyData.filter(note=>note.chat._id !== payload.chat._id)
      }
      if(filterNotifyData.length){

        return {
          notifyData:[...filterNotifyData]
        }
      }else{

          localStorage.removeItem("dosti-chat-notifyData")
      }
      return initState

    default:return state
  }
}
