import {useState} from 'react';
import {ButtonToggle, Form, FormGroup, Label, Input, Col, Container} from 'reactstrap'

const Login=(props)=>{

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const handleSubmit=(e)=>{
        console.log(username,password)
        e.preventDefault();

    }
    return(
        <div>
            <Container id="formBackground">
            <h1>Login</h1>
    
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <FormGroup row>
                    <Label for="username" md={2} style={{textAlign: 'right'}}>Username:</Label>
                    <Col md={9}>
                        <Input placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="password" sm={2} style={{textAlign: 'right'}}>Password:</Label>
                    <Col md={9}>
                        <Input placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                    </Col>
                </FormGroup>

                <ButtonToggle id="formButton" onClick={(e)=>handleSubmit(e)}>Submit</ButtonToggle>
            </Form>

            <ButtonToggle id="formButton" onClick={()=>props.setShowWhich('signup')}>I need an account</ButtonToggle>

            </Container>
        </div>
    )
}
export default Login;