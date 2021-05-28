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
    } else{
      const json=await result.json();
      setUser(json);
      setSessionToken(token)
      setAdminLogin(json.isAdmin)
    }
  };
 


  const clearToken=()=>{
    localStorage.clear();
    setSessionToken('');
  }
  const updateToken=(newToken)=>{
    localStorage.setItem("token", newToken)
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);

  }
  const showThis = ()=>{
    if(sessionToken!==''){
      return (
        <Home user={user} adminLogin={adminLogin} sessionToken={sessionToken} clearToken={clearToken}/>
      )
    } else {
      if(showAuth){
        return(
          <Auth setUser={setUser} setAdminLogin={setAdminLogin} updateToken={updateToken}/> 
        )
    } else {
      return(
        <SplashPage setShowAuth={setShowAuth}/>
      )
    } 
  }
}

  return (
    <div className="App">
      {showThis()}
    </div>
  );
}

export default App;
