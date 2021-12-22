import React from 'react'
import {Route,Switch} from "react-router-dom"
import Homepage from "../pages/Homepage"
import Chatpage from "../pages/Chatpage"
const Routes = ({children}) => {
    return (
      <Switch>
        <Route exact path="/">
          <Homepage/>
        </Route>
        <Route path="/chats">
          <Chatpage/>
        </Route>


      </Switch>

    )
}

export default Routes
