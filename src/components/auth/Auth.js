import {useState} from 'react';

import Login from './Login';
import Signup from './Signup';

const Auth=(props)=>{
    const [showWhich,setShowWhich]=useState('login')
    console.log("auth props",props)
    return(
        
        <div>
            Auth
            {showWhich=='login'?
                <Login 
                    setAdminLogin={props.setAdminLogin}
                    updateToken={props.updateToken}
                    setShowWhich={setShowWhich}
                />
                :
                <Signup 
                    setAdminLogin={props.setAdminLogin}
                    updateToken={props.updateToken}
                    setShowWhich={setShowWhich}
                />
            }
        </div>
    )
}

export default Auth