import React, {useEffect, useState} from 'react';
import CreatePoll from './CreatePoll';
import AdminPollResults from './AdminPollResults'

const AdminIndex=(props)=>{
    

    return(
        <div>
            <CreatePoll sessionToken={props.sessionToken}/>
            <br />
            <AdminPollResults sessionToken={props.sessionToken}/>    
        </div>
    )
}

export default AdminIndex;





