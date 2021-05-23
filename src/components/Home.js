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
        <PollDisplay 
        user={{userName: "Bill Test", isAdmin: false}} 
        sessionToken={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIxNzYwMTA4LCJleHAiOjE2MjE4NDY1MDh9.9nkWYiFBW5uzWNvzQOu-4UEwLa2dMjZF_mPHX01XSXc"}
      />
      </div>
    );
  
}
export default Home;