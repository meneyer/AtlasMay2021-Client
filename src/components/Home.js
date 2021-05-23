import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PollDisplay from './poll/PollDisplay';

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
        <PollDisplay />
      </div>
    );
  
}
export default Home;