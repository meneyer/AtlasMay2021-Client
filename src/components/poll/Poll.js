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

      <FormGroup tag="fieldset">
         {options.map((option, i) => {
           return(
            <FormGroup check>
              <Label check id="formLabelsSmaller">
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
                  data-option_num={i}/>
                  {`${option.text}`}
              </Label>
            </FormGroup>
           )}
         )}
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
        <br />
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
        <Col md="5" id="formBackgroundAlmostFull">
        {renderPollForm()}
        </Col>
        <Col md="7" id="formBackgroundAlmostFull">
        {renderResults()}
        </Col>      
      </Row>
    </Container>
  )
}

export default Poll;