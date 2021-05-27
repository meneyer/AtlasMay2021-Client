import React, {useEffect, useState} from 'react';
import {
  Col,
  Container, 
  Row,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap'
import PollResults from './PollResults';
import Poll from './Poll';
import APIURL from '../../helpers/environment'

const PollDisplay = (props) => {
  const user = props.user;
  const [polls, setPolls] = useState([]);
  const [currPoll, setCurrPoll] = useState(0);

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

  useEffect(() => {getPolls()}, []);

  const pollButtonMapper = () => {
    return (
      <ListGroup horizontal>
        {polls.map((poll, i) => {
          return(
            <ListGroupItem tag="button" key={`poll${i}`} onClick = {() => {setCurrPoll(i)}}>
              <ListGroupItemHeading> {`Poll #${i+1}`} </ListGroupItemHeading>
              <ListGroupItemText> {`${poll.question}`} </ListGroupItemText>
            </ListGroupItem>
          )
        })}
      </ListGroup>
    )
  }


  return (
    <Container className="poll-display-main">
      <Row className="poll-display-header"> 
        <h1> {`Welcome ${user.userName}. Select a poll to answer and view results.`}</h1>
      </Row>
      <Row>
        {polls.length > 0 ? pollButtonMapper() : null}
      </Row>
      <Row>
        <h1>{`Poll # ${currPoll+1}`}</h1>
        {polls.length > 0 
          ?<Poll 
            user={user} 
            sessionToken={props.sessionToken} 
            poll={polls[currPoll]} 
            pollNum={currPoll+1}
            hasVoted={user.pollsVotedOn.includes(polls[currPoll].id)}/>
          :null
        } 
      </Row>
    </Container>
  )

}

export default PollDisplay;