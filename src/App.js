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
    console.log('useeffect')
    const localToken=localStorage.getItem('token');
    if (localToken){
      checkToken(localToken);
    }
  },[])

  const checkToken = async (token) => {
    console.log('checking for a token',token)
    const result = await fetch(`${APIURL}/user/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    });
    console.log('checkToken result',result)
    if (result.status !== 200) {
      console.log('clearing token')
      clearToken();
    } else{
      const json=await result.json();
      console.log('json',json)
      setUser(json);
      setSessionToken(token)
    }
  };
 


  const clearToken=()=>{
    localStorage.clear();
    setSessionToken('');
  }
  const updateToken=(newToken)=>{
    console.log("token updated",newToken)
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
