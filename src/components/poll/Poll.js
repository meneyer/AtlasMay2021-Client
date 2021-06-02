import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
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
import PollResults from './PollResults'

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
              <Label check id="formLabelsSmaller">
                <Input 
                  type="checkbox" 
                  onChange={handleMultiInput}
                  data-option_num={i}
                  disabled={hasVoted}/>{' '}
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
              <Label check id="formLabelsSmaller">
                <Input 
                  type="radio" 
                  name={`poll_${poll.id}_options`} 
                  onChange={handleSingleInput}
                  data-option_num={i}
                  disabled={hasVoted}/>
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
        <h2>{`${poll.question}`}</h2>
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

  // let renderResults = () => {
  // }

  return (
    <Container className="poll-main" >
      <Row>
        <Col md="4" id="formBackgroundAlmostFull">
          {renderPollForm()}
        </Col>
        <Col md="8" id="formBackgroundNearlyFull">
          {hasVoted ? <PollResults options={options} votes={votes}/> : <h3>Vote to see the results!</h3>}
        </Col>
      </Row>
    </Container>
  )
}

Poll.propTypes = {
  user: PropTypes.shape({
    isAdmin: PropTypes.bool,
    pollsVotedOn:PropTypes.arrayOf(PropTypes.number),
    sessionToken: PropTypes.string,
    userId: PropTypes.number,
    userName: PropTypes.string
  }),
  sessionToken: PropTypes.string,
  poll: PropTypes.shape({
    createdAt:PropTypes.string,
    id: PropTypes.number,
    multiSelect: PropTypes.bool,
    published: PropTypes.bool,
    question: PropTypes.string,
    updatedAt: PropTypes.string
  }).isRequired,
  pollNum: PropTypes.number,
  hasVoted: PropTypes.bool
}

Poll.defaultProps = {
  user: PropTypes.shape({
    authenticated: false
  }),
  sessionToken: "",
  pollNum: 0,
  hasVoted: false
}

export default Poll;