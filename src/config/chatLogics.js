import moment from "moment-timezone"
export const getSender=(loggedUser,users)=>{
  return users[0]._id===loggedUser._id? users[1].name :users[0].name
}
export const getSenderPic=(loggedUser,users)=>{
  return users[0]?._id===loggedUser._id? users[1]?.pic :users[0]?.pic

}
export const getSenderData=(loggedUser,users)=>{
  return users[0]._id===loggedUser._id? users[1] :users[0]
}
export const getGroupMessageSender=(loggedUser,user)=>{

  return user._id &&  user._id===loggedUser._id? "You ":user.name.split(" ")[0]
}
export const checkUsersOnline=(loggedUser,users)=>{
  return users[0]._id===loggedUser._id? users[1]?.isOnline :users[0]?.isOnline
}
export const debounce =(func,delay)=>{
  let debounceTimer
  return function(){
    const context=this
    const args=arguments
    clearTimeout(debounceTimer)
    debounceTimer=setTimeout(()=>func.apply(context,args),delay)
  }
}

export const isSameSender=(messages,m,i,userId)=>{
  return(
    i<messages.length -1 &&
    (
      messages[i+1].sender._id !== m.sender._id ||
      messages[i+1].sender._id ===undefined)

      &&
      messages[i].sender._id!==userId

  )
}

export const isLastMessage=(messages,i,userId)=>{
  return(
    i===messages.length -1 &&
    messages[messages.length-1].sender._id
    !== userId &&
    messages[messages.length-1].sender._id

  )
}

export const isSameSenderMargin=(messages,msg,i,userId)=>{
  if(
    i<messages.length -1 &&
    messages[i+1].sender._id===msg.sender._id &&
    messages[i].sender._id!==userId
  )
  return 33
  else if(
    (i<messages.length-1 &&
      messages[i+1].sender._id!==msg.sender._id &&
      messages[i].sender._id !== userId) ||
      (i===messages.length -1 && messages[i].sender._id !==userId)
  )
  return 0;
  else return "auto"

}

export const isSameUser=(messages,msg,i)=>{
  return i>0 && messages[i-1].sender?._id==msg.sender?._id
}


export const getMessageData=(date)=>{

    if(parseInt(moment().tz("Asia/Kolkata").format("d"))===
    parseInt(moment(date).tz("Asia/Kolkata").format("d")))
    {
      return moment(date).tz("Asia/Kolkata").format("hh:mm a")
    }
    else if(parseInt(moment().tz("Asia/Kolkata").format("d"))-
    parseInt(moment(date).tz("Asia/Kolkata").format("d"))==1) {
      return moment(date).tz("Asia/Kolkata").format("dddd")

    }else{
      return moment(date).tz("Asia/Kolkata").format("L")
    }
}
