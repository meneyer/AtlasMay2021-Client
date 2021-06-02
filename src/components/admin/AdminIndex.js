import React, {useEffect, useState} from 'react';
import AdminPollResults from './AdminPollResults';
import CreatePoll from './CreatePoll';


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





