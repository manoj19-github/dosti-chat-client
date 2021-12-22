import {
  createStore,applyMiddleware,
  combineReducers
} from 'redux'

import {
  composeWithDevTools
} from "redux-devtools-extension"

import thunk from "redux-thunk"
import {authReducer} from "../reducer/authReducer"
import {searchUserReducer} from "../reducer/searchUserReducer"
import {selectUserReducer}from "../reducer/selectUserReducer"
import {chatReducer} from "../reducer/chatReducer"
import {searchGroupUsersReducer} from "../reducer/searchGroupUsersReducer"
import {messagesReducer}from "../reducer/messagesReducer"
import {notifyReducer} from "../reducer/notificationReducer"

const rootReducer=combineReducers({
  authReducer,searchUserReducer,
  selectUserReducer,chatReducer,
  searchGroupUsersReducer,
  messagesReducer,
  notifyReducer
})

const store=createStore(rootReducer,{},composeWithDevTools(applyMiddleware(thunk)))
export default store
