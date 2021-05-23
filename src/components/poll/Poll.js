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
  const {user, token, poll} = props

  const [options, setOptions] = useState([]);

  const getOptions = () => {
    const url = `http://localhost:3000/options/${poll.id}`
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
        .then((optionData) => {
            setOptions(optionData)
            console.log(optionData);
        })
  }

  useEffect(() => {getOptions()});


  return (
    <Container className="poll-main">
      <Row className="poll-header"> 
        <h1> {Poll}</h1>
        <p>{`${poll.question}`}</p>
      </Row>
    </Container>
  )
}

export default Poll;