import React, {useEffect, useState} from 'react';
import CreatePoll from './CreatePoll';
import {Container, Row, Col, Button} from 'reactstrap'
import {Bar, Doughnut} from 'react-chartjs-2';
import APIURL from '../../helpers/environment'

const AdminIndex=(props)=>{
    const [polls, setPolls] = useState([]);

    const getPolls = () => {
        console.log(props.sessionToken)
        const url = `${APIURL}/poll/`
            console.log("got to here in fetch")
            fetch(url,
            {
                method: 'GET',
                headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
                })
            })
            .then((res) => {
            return res.json()
            })
            .then((pollData) => {
                setPolls(pollData)
                console.log(pollData);
            })
            .catch(err => console.log(`Failed poll fetch: ${err}`));
    }


    const deletePollResults = (polls) => {
        console.log(props.sessionToken)
        const url = `${APIURL}/poll/${polls.id}`
        console.log("got to here in fetch")
        fetch(url,
        {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            })
        })
        .then(() => props.getPolls())
    }


    const pollMapper = () => {
        return props.options.map((options) => {
            return (
                <div>
                    <Button onClick={() => {props.getPolls()}}>Get All Poll Results</Button>
                    <Button onClick={() => {deletePollResults(polls)}}>delete</Button>
                </div>
            )
    
        })
        
    }

    return(
        <div>
    <CreatePoll sessionToken={props.sessionToken}/>
    {pollMapper()}
        </div>
    )
}

export default AdminIndex;





