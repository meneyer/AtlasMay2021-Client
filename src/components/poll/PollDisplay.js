import React, {useEffect, useState} from 'react';
import {
  Container, 
  Row
} from 'reactstrap'
import PollResults from './PollResults';
import Poll from './Poll';


const PollDisplay = (props) => {
  const user = props.user;
  const [polls, setPolls] = useState([]);

  const getPolls = () => {
    const url = 'http://localhost:3000/poll/'
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
  }

  useEffect(() => {getPolls()}, []);

  const pollMapper = () => {
    return (
      polls.map((poll) => {
        return(
          <Poll user={user} sessiontoken={props.sessionToken} poll={poll} />
        )
      })
    )
    
  }


  return (
    <Container className="poll-display-main">
      <Row className="poll-display-header"> 
        <h1> {`Welcome ${user.userName}. Select a poll to answer and view results.`}</h1>
        {polls.length > 0 ? pollMapper() : null}
      </Row>
    </Container>
  )

}

export default PollDisplay;