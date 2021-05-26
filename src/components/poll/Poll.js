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
  const [selections, setSelections] = useState([]);
  const [hasVoted, setHasVoted] = useState(props.hasVoted);


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
            let makeSelections = [];
            optionData.forEach(option => {
              makeVotes.push(option.votes)
              makeSelections.push(false)
            })
              
            setVotes(makeVotes);
            setSelections(makeSelections);
            
        })
        .catch(err => console.log(`Failed option fetch: ${err}`));
  };

  useEffect(() => {
    if(poll) getOptions();
    setHasVoted(props.hasVoted)
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
    let selected = Number(e.currentTarget.dataset.option_num);
    let currSelections = selections;
    currSelections[selected] = e.currentTarget.checked;
    setSelections(currSelections);
    console.log(selections);
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
    let currSelections = selections;
    for(let i = 0; i < selections.length; i++){
      if(i === selected){
        currSelections[i] = true;
      }else{
        currSelections[i] = false;
      }
    }
    setSelections(currSelections)
    console.log(selections)
  }

  let renderPollForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <h3>{`Poll #${pollNum}`}</h3>
        <h4>{`${poll.question}`}</h4>
        {poll.multiSelect
        ? renderMultiSelectForm()
        : renderSingleSelectForm()}
        <Button id='formButton' disabled={hasVoted}>Submit</Button>
      </Form>
    )
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    let currOptions = options;
    let currVotes = votes;
    currOptions.forEach((option, i) => {
      if(selections[i]){
        option.votes += 1
        updateOptions(option)
        currVotes[i] += 1
      }
    })
    setVotes(currVotes)
    setHasVoted(true);
    updateUser();
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

  let updateUser = () => {
    const url = `${APIURL}/user/${user.userId}`

    let updatePollsVotedOn = user.pollsVotedOn
    updatePollsVotedOn.push(poll.id);
    console.log(updatePollsVotedOn)
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({pollsVotedOn: updatePollsVotedOn}),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': props.sessionToken
      })
    })
    .then(res => res.json())
    .then((json) => {
      console.log(json)
    })
    .catch(err => console.log(`Failed to update user: ${err}`))
  }

  let renderResults = () => {
    return (
      <div>
        <h4> Results Here </h4>
        {options.map((option, i) => 
          <p>{`${option.text}: ${votes[i]}`}</p>
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