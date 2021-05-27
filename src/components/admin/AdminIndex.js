import React, {useEffect, useState} from 'react';
import CreatePoll from './CreatePoll';
import PollResults from './PollResults';


const AdminIndex=(props)=>{
    return(
        <div>
    <CreatePoll sessionToken={props.sessionToken}/>
    <PollResults sessionToken={props.sessionToken}/>
        </div>
    )
}

export default AdminIndex;





