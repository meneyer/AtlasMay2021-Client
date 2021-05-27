import {useState,useEffect} from 'react'

import Auth from './components/auth/Auth'
import Home from './components/Home'
import SplashPage from './SplashPage'

import APIURL from "./helpers/environment.js";
import './App.css';

function App() {
  const [sessionToken,setSessionToken]=useState('');
  const [adminLogin,setAdminLogin]=useState(false);
  const [showAuth,setShowAuth]=useState(false);
  const [user,setUser]=useState({})
  
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
    localStorage.setItem("token", newToken)
    console.log("token updated",newToken)
    setSessionToken(newToken);
  }
  const showThis = ()=>{
    if(showAuth){
      if(sessionToken===''){
        return(
          <Auth setUser={setUser} setAdminLogin={setAdminLogin} updateToken={updateToken}/> 
        )
      } else {
        return (
          <Home user={user} adminLogin={adminLogin} sessionToken={sessionToken} clearToken={clearToken}/>
        )
      }
    } else {
      return(
        <SplashPage setShowAuth={setShowAuth}/>
      )
    }
  }
  return (
    <div className="App">
      {showThis()}
    </div>
  );
}

export default App;
