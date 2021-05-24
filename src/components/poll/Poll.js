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
  const poll = props.poll

  const [options, setOptions] = useState([]);

  const getOptions = () => {
    const url = `http://localhost:3000/options/${poll.id}`
        console.log("got to here in fetch")
        fetch(url,
        {
            method: 'GET',
            headers: new Headers ({
            'Content-Type': 'application/json',
            'Authorization': sessionToken
            })
        })
        .then((res) => {
          console.log(res)
          return res.json()
        })
        .then((optionData) => {
            setOptions(optionData)
            console.log(optionData);
        })
  }

  useEffect(() => {
    if(poll) getOptions();
  },[poll]);


  return (
    <Container className="poll-main">
      <Row className="poll-header"> 
        <h1> {Poll}</h1>
        <p>{poll ? `${poll.question}` : null}</p>
      </Row>
    </Container>
  )
}

export default Poll;