import React, {useEffect, useState} from 'react';
import {
  Container, 
  Row, 
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
} from 'reactstrap'


const Poll = (props) => {
  console.log(props.poll);
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
  };

  useEffect(() => {
    if(poll) getOptions();
  },[poll])

  let renderMultiSelectForm = () => {
    return (
      <FormGroup>
        <Input type="select" name="selectMulti" id="exampleSelect" multiple>
          <option>--- Select multiple ---</option>
          {options.map((option, i) => {
            return(
              <option key={i} >{option.text}</option>
            )
          })}
        </Input>
      </FormGroup>
    )
  }

  let renderSingleSelectForm = () => {
    return (
      <FormGroup>
        <Input type="select" name="select" id="exampleSelect">
          <option>--- Select one ---</option>
          {options.map((option, i) => {
            return(
              <option key={i} >{option.text}</option>
            )
          })}
        </Input>
      </FormGroup>
    )
  }
  let renderPollForm = () => {
    return (
      <Form onSubmit={(e)=>{handleSubmit(e)}}>
        <h3>{`Poll #${pollNum}`}</h3>
        <h4>{`${poll.question}`}</h4>
        {poll.multiSelect
        ? renderMultiSelectForm()
        : renderSingleSelectForm()}
        <Button id='formButton'>Submit</Button>
      </Form>
    )
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Clicked Submit on poll ${pollNum}`)
  }

  let renderResults = () => {
    return (
      <div>
        <h4> Results Here </h4>
      </div>
    )
  }

  return (
    <Container className="poll-main" >
      <Row>
        <Col md="6" id="formBackground">
        {renderPollForm()}
        </Col>
        <Col md="6" id="formBackground">
        {renderResults()}
        </Col>
      </Row>
    </Container>
  )
}

export default Poll;