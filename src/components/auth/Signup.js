import {useState} from 'react';

const Signup=(props)=>{

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const handleSubmit=(e)=>{

    }
    return(
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
                
            </form>
            <button/>
        </div>
    )
}
export default Signup;