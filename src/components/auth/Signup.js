import {useState} from 'react';
import {ButtonToggle, Form, FormGroup, Label, Input, Col} from 'reactstrap'

const Signup=(props)=>{

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const handleSubmit=(e)=>{

    }
    return(
        <div>
            <h1>Sign Up</h1>
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <FormGroup row>
                    <Label for="username" sm={2} style={{textAlign: 'right'}}>Username:</Label>
                    <Col sm={9}>
                        <Input placeholder='Username' onChange={(e)=>setUsername(e.target.value)} />
                    </Col>
                </FormGroup>  

            </Form>

        </div>
    )
}
export default Signup;