import {useState,useEffect} from 'react'

import Auth from './components/auth/Auth'
import Home from './components/Home'
import PollDisplay from './components/poll/PollDisplay';

import APIURL from "./helpers/environment.js";
import './App.css';

function App() {
  const [sessionToken,setSessionToken]=useState('')
  const [user,setUser]=useState({});
  
  useEffect(()=>{
    const localToken=localStorage.getItem('token');
    if (localToken){
      checkToken(localToken);
    }
  },[])



  const checkToken = async (token) => {
    const result = await fetch(`${APIURL}/user/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    });
    if (result.status === 200) {
      const user = await result.json();
      setUser(user);
    } else {
      clearToken();
    }
  };

  const clearToken=()=>{
    localStorage.clear();
    setSessionToken('');
  }
  const updateToken=(newToken)=>{
    setSessionToken(newToken);
  }

  return (
    <div className="App">
      {/* <Auth updateToken={updateToken} setSessionToken={setSessionToken}/> */}
      <PollDisplay 
        user={{userName: "Bill Test", isAdmin: false}} 
        sessionToken={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIxNzYwMTA4LCJleHAiOjE2MjE4NDY1MDh9.9nkWYiFBW5uzWNvzQOu-4UEwLa2dMjZF_mPHX01XSXc"}
      />
    </div>
  );
}

export default App;
