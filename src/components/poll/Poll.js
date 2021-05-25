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

import APIURL from '../../helpers/environment'

const Poll = (props) => {
  const user = props.user;
  const sessionToken = props.sessionToken;
  const poll = props.poll;
  const pollNum = props.pollNum;

  const [options, setOptions] = useState([]);
  const [votes, setVotes] = useState([]);


  const getOptions = () => {
    const url = `${APIURL}/option/${poll.id}`
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
            let makeVotes = [];
            optionData.forEach(option =>makeVotes.push(option.votes))
            setVotes(makeVotes);
            console.log(makeVotes);
        })
        .catch(err => console.log(`Failed option fetch: ${err}`));
  };

  useEffect(() => {
    if(poll) getOptions();
  },[poll])

  let renderMultiSelectForm = () => {
    return (
      <FormGroup tag="fieldset">
         {options.map((option, i) => {
           return(
            <FormGroup check>
              <Label check>
                <Input 
                  type="checkbox" 
                  onChange={handleMultiInput}
                  data-option_num={i}/>{' '}
                {`${option.text}`}
              </Label>
            </FormGroup>
           )}
         )}
      </FormGroup>
    )
  }

  let handleMultiInput = (e) => {
    let selected = e.currentTarget.dataset.option_num;
    let currVotes = votes;
    currVotes[selected] = e.currentTarget.checked ? 1 : 0;
    setVotes(currVotes)
    console.log(votes)
  }

  let renderSingleSelectForm = () => {
    return (
      
      <FormGroup tag="fieldset">
         {options.map((option, i) => {
           return(
            <FormGroup check>
              <Label check>
                <Input 
                  type="radio" 
                  name={`poll_${poll.id}_options`} 
                  onChange={handleSingleInput}
                  data-option_num={i}/>
                  {`${option.text}`}
              </Label>
            </FormGroup>
           )}
         )}
      </FormGroup>
    )
  }

  let handleSingleInput = (e) => {
    let selected = Number(e.currentTarget.dataset.option_num);
    console.log(selected)
    let currVotes = votes;
    for(let i = 0; i < votes.length; i++){
      if(i === selected){
        currVotes[i] = 1;
      }else{
        currVotes[i] = 0;
      }
    }
    setVotes(currVotes)
    console.log(votes)
  }

  let renderPollForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
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
    let currOptions = options;
    currOptions.forEach((option, i) => {
      if(votes[i]){
        option.votes += 1
        updateOptions(option)
      }
    })
    
  }

  let updateOptions = (option) => {
    const url = `${APIURL}/option/${option.id}`

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(option),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': props.sessionToken
      })
    })
    .then(res => res.json())
    .then((json) => {
      console.log(json)
    })
    .catch(err => console.log(`Failed to update option: ${err}`))
  }

  let renderResults = () => {
    return (
      <div>
        <h4> Results Here </h4>
        {options.map((option, i) => 
          <p>{`${option.text}: ${option.votes}`}</p>
        )}
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