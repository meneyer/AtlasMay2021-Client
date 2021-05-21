import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import APIURL from "../helpers/environment";


const Home = ()=> {
  

    return (
      <div>
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