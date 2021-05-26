import React, {useEffect, useState} from 'react';
import {Table} from 'reactstrap';
import CreatePoll from './CreatePoll';


const AdminIndex=(props)=>{
    return(
        <div>
            <Table hover id= "formBackgroundOpposite" style={{color: '#DEE2F7'}}>
      <thead>
        <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        </tr>
        <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        </tr>
        <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
        </tr>
    </tbody>
    </Table>   
    <CreatePoll sessionToken={props.sessionToken}/>

        </div>
    )
}

export default AdminIndex;