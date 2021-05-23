import {useState} from 'react';
import APIURL from "../../helpers/environment.js";

const Login=(props)=>{

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [badLogin,setBadLogin]=useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        setBadLogin(false);
        const result = await fetch(`${APIURL}/user/login`, {
          method: "POST",
          body: JSON.stringify(
            {
              userName: username,
              password: password,
            },
          ),
          headers: new Headers({
            "Content-Type": "application/json"
          }),
        });
        const res = await result.json();
        if (result.status===200){
            props.updateToken(res.sesionToken);
            props.setAdminLogin(res.isAdmin);
            props.setUser(res);
        }
        if (res.error) {
            setBadLogin(true)
        } 
      };


    return(
        <div>login
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
                <input placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={(e)=>handleSubmit(e)}>Submit</button>
                {badLogin&&<p>Login failed</p>}

            </form>
            <button onClick={()=>props.setShowWhich('signup')}>I need an account</button>
        </div>
    )
}
export default Login;