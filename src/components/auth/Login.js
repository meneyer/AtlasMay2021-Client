import {useState} from 'react';

const Login=(props)=>{

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const handleSubmit=(e)=>{
        console.log(username,password)
        e.preventDefault();

    }
    return(
        <div>login
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
                <input placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={(e)=>handleSubmit(e)}>Submit</button>
            </form>
            <button onClick={()=>props.setShowWhich('signup')}>I need an account</button>
        </div>
    )
}
export default Login;