import React, {useEffect, useState} from 'react';
import {
  Container, 
  Row, 
  Col, 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
} from 'reactstrap'


const Poll = (props) => {
  const user = props.user;
  const sessionToken = props.sessionToken;
  const poll = props.poll;
  const pollNum = props.pollNum;

  const [options, setOptions] = useState([]);

  const getOptions = () => {
    const url = `http://localhost:3000/option/${poll.id}`
        fetch(url,
        {
            method: 'GET',
            headers: new Headers ({
            'Content-Type': 'application/json',
            'Authorization': sessionToken
            })
        })
        .then((res) => res.json())
        .then((optionData) => {
            setOptions(optionData)
            console.log(optionData);
        })
        .catch(err => console.log(`Failed option fetch: ${err}`));
  }

  useEffect(() => {
    if(poll) getOptions();
  },[poll]);

  let renderPollForm = () => {
    return (
      <div>
        <h3>{`Poll #${pollNum}`}</h3>
        <h4>{poll.question}</h4>

        {options.map(option => {
          return (
            <h5>
              {option.text}
            </h5>
          )
        })}
      </div>
    )
  }

  let renderResults = () => {
    return (
      <div>
        <h4> Results Here </h4>
      </div>
    )
  }

  return (
    <Container className="poll-main">
      <Row className="poll-header">
        <Col md="6">
        {renderPollForm()}
        </Col>
        <Col md="6">
        {renderResults()}
        </Col>
      </Row>
    </Container>
  )
}

export default Poll;