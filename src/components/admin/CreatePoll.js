import {useState} from 'react';
import Switch from "react-switch";
import {ButtonToggle, Form, FormGroup, Label, Input, Col, Button} from 'reactstrap'

import APIURL from "../../helpers/environment.js";

const CreatePoll=(props)=>{
    const [question,setQuestion]=useState('');
    const [optionsArray,setOptionsArray]=useState(['',''])
    const [checked, setChecked] = useState(false);

    const handleChange = nextChecked => {
        setChecked(nextChecked);
      };

    const changeArray=(text,index)=>{
        optionsArray[index]=text;
    }
    const addOption=(e)=>{
        e.preventDefault();
        setOptionsArray([...optionsArray,''])
    }
    
    const handleSubmit = async (e) => {
      console.log(props.sessionToken)
        e.preventDefault();
        const result = await fetch(`${APIURL}/poll`, {
          method: "POST",
          body: JSON.stringify({
            question: question,
            published: false,
            multiSelect: checked
          }),
          headers: new Headers({
            "Content-Type": "application/json",
            'Authorization': props.sessionToken
          }),
        });
        const res = await result.json();
        handleOptions(res.id)
        
      };
      const handleOptions=async(id)=>{
          for (let i=0;i<optionsArray.length;i++){
              if(optionsArray[i]!==''){
                  const result = await fetch(`${APIURL}/option`, {
                method: "POST",
                body: JSON.stringify({
                  text: optionsArray[i],
                  pollId:id
                }),
                headers: new Headers({
                  "Content-Type": "application/json",
                  'Authorization': props.sessionToken
                }),
              });
              const res = await result.json();
              console.log(res)
              }
          }
      }
    return(
        <div id="formBackground">
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <FormGroup row>
                    <Label for="question" md={2} id="formLabels">Poll question:</Label>
                    <Col md={9}>
                        <Input placeholder='' onChange={(e)=>setQuestion(e.target.value)}/>
                    </Col>
                </FormGroup>
                <Label for="admin" id="formLabels">
              Employees can vote on mulitple options <Switch
                onChange={handleChange}
                checked={checked}
                className="react-switch"
              />
            </Label>
                {optionsArray.map((option,index)=>{
                    return(
                        <FormGroup row>
                    <Label for={`option${1}`} sm={2} id="formLabels">{`Option ${index+1}`}:</Label>
                    <Col md={9}>
                        <Input   onChange={(e)=>changeArray(e.target.value,index)}/>
                    </Col>
                </FormGroup>
                    )
                   
                })}
                <Button id="formButton" onClick={(e)=>addOption(e)}>Add option</Button>
                {/* <FormGroup row>
                    <Label for={`option${1}`} sm={2} style={{textAlign: 'right'}}>{`Option ${1}`}:</Label>
                    <Col md={9}>
                        <Input placeholder='option'  onChange={(e)=>changeArray(e.target.value,1)}/>
                    </Col>
                </FormGroup> */}
                <br />
                <br />
                <ButtonToggle id="formButton" onClick={(e)=>handleSubmit(e)}>Submit</ButtonToggle>
            </Form>
        </div>
    )
}

export default CreatePoll;