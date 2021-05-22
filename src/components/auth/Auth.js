import {useState} from 'react';

import Login from './Login';
import Signup from './Signup';

const Auth=(props)=>{
    const [showWhich,setShowWhich]=useState('login')
    return(
        <div>
            Auth
            {showWhich=='login'?<Login setShowWhich={setShowWhich}/>:<Signup setShowWhich={setShowWhich}/>}
        </div>
    )
}

export default Auth