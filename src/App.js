import React,{useEffect} from "react"
import {useSelector} from "react-redux"
import './App.css';
import Routes from "./Routes"
import {BrowserRouter as Router,useHistory} from "react-router-dom"
import {ChakraProvider} from "@chakra-ui/react"
import axios from "axios"
axios.defaults.baseURL=`${process.env.REACT_APP_SERVER_URL}`
function App() {
  const history=useHistory()
  const userToken=useSelector(state=>state.authReducer.userToken)
  useEffect(()=>{
    if(userToken){
      history.push("/chats")
    }else{
      history.push("/")
    }

  },[userToken])
  return (
      <Routes/>
  );
}

export default App;
