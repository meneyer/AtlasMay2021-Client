import {useState,useEffect} from 'react'

import Auth from './components/auth/Auth'
import Home from './components/Home'

import APIURL from "./helpers/environment.js";
import './App.css';

function App() {
  const [sessionToken,setSessionToken]=useState('');
  const [adminLogin,setAdminLogin]=useState('false');
  
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
    if (result.status !== 200) {
      clearToken();
    }
  };

  const clearToken=()=>{
    localStorage.clear();
    setSessionToken('');
  }
  const updateToken=(newToken)=>{
    console.log("token updated",newToken)
    setSessionToken(newToken);
  }

  return (
    <div className="App">
      {sessionToken===''?
      <Auth setAdminLogin={setAdminLogin} updateToken={updateToken}/>
      :
      <Home adminLogin={adminLogin} sessionToken={sessionToken} clearToken={clearToken}/>
    }
    </div>
  );
}

export default App;
