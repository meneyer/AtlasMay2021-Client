import React, {useEffect, useState} from 'react';
import {
  Container, 
  Row
} from 'reactstrap'
import PollResults from './PollResults';
import Poll from './Poll';


const PollDisplay = (props) => {
  const user = props.user;
  const token = props.sessionToken;
  console.log(token)
  const [polls, setPolls] = useState([]);

  const getPolls = () => {
    const url = 'http://localhost:3000/poll/'
        console.log("Token: ", token)
        console.log("got to here in fetch")
        fetch(url,
        {
            method: 'GET',
            headers: new Headers ({
            'Content-Type': 'application/json',
            'Authorization': token
            })
        })
        .then((res) => {
          console.log(res)
          return res.json()
        })
        .then((pollData) => {
            setPolls(pollData)
            console.log(pollData);
        })
  }

  useEffect(() => {getPolls()}, []);


  return (
    <Container className="poll-display-main">
      <Row className="poll-display-header"> 
        <h1> {`Welcome ${user.userName}. Select a poll to answer and view results.`}</h1>
        <Poll user={user} token={token} poll={{id: 1, question: "Test?", published: true, multiSelect: true}} />
      </Row>
    </Container>
  )
}

export default PollDisplay;