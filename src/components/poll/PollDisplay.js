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
    const url = `${APIURL}/poll/`
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
          let publishedPolls = pollData.filter(poll => poll.published);
          setPolls(publishedPolls)
          console.log(polls)
        })
        .catch(err => console.log(`Failed poll fetch: ${err}`));
  }

  useEffect(() => {getPolls()}, []);

  const pollButtonMapper = () => {
    return (
      <ListGroup horizontal >
        {polls.filter(poll => poll.published).map((poll, i) => {
          return(
            <ListGroupItem id="formBackgroundOppositeAlmostFull" tag="button" key={`poll${i}`} onClick = {() => {setCurrPoll(i)}}>
              <ListGroupItemHeading > {`Poll #${i+1}`} </ListGroupItemHeading>
              <ListGroupItemText > {`${poll.question}`} </ListGroupItemText>
            </ListGroupItem>
          )
        })}
      </ListGroup>
    )
  }


  return (
    <Container className="poll-display-main">
      <Row > 
      <Col md="2"></Col>
      <Col md="8" id="formBackgroundOpposite" >
        <h1 > {`Welcome ${user.userName}`}</h1>
        <h3> Select a poll to answer and view results.</h3>
      </Col>
      <Col md="2"></Col>
      </Row>
        <br />  
      <Row >
        {polls.length > 0 ? pollButtonMapper() : null}
      </Row> 
      <Row >        
        <h1 id="formBackground" >{`Poll # ${currPoll+1}`}</h1>
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