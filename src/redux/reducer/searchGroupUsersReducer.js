import {MembersRequestTypes} from "../action/Types"
const initSearch={
  loading:false,
  usersData:null,
  error:null

}

export const searchGroupUsersReducer=(state=initSearch,action)=>{
  const{type,payload}=action
  switch(type){
    case MembersRequestTypes.MEMBER_REQUEST:
      return{
        ...state,
        loading:true
      }
    case MembersRequestTypes.MEMBER_SUCCESS:
      return{
        ...state,
        loading:false,
        usersData:payload
      }
    case MembersRequestTypes.SEARCH_INIT:
        return initSearch
    case MembersRequestTypes.MEMBER_FAILED:
      return{
        ...state,
        loading:false,
        error:payload
      }
      default:return state
  }

}
