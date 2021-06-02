import React, {useEffect, useState} from 'react';
import CreatePoll from './CreatePoll';

const AdminIndex=(props)=>{
    

    return(
        <div>
    <CreatePoll sessionToken={props.sessionToken}/>
    
        </div>
    )
}

export default AdminIndex;





