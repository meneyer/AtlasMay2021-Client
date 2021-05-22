import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeaderBar from './HeaderBar'
import APIURL from "../helpers/environment";


const Home = (props)=> {
  

    return (
      <div>
        {props.adminLogin&&<p>Admin is logged in</p>}
        <HeaderBar clearToken={props.clearToken}/>
        <Router>
          <Switch>
            <Route exact path="/">
        
            </Route>
            <Route path="">
             
            </Route>
            <Route path="">
             
            </Route>
          </Switch>
        </Router>
      </div>
    );
  
}
export default Home;