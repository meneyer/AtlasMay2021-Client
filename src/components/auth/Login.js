import {useState} from 'react';
import {ButtonToggle, Form, FormGroup, Label, Input, Col, Container} from 'reactstrap'
import APIURL from "../../helpers/environment.js";


const Login=(props)=>{

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [badLogin,setBadLogin]=useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        setBadLogin(false);
        const result = await fetch(`${APIURL}/user/login`, {
          method: "POST",
          body: JSON.stringify(
            {
              userName: username,
              password: password
            },
          ),
          headers: new Headers({
            "Content-Type": "application/json"
          }),
        });
        const res = await result.json();
        if (result.status===200){
            props.updateToken(res.sessionToken);
            props.setAdminLogin(res.isAdmin);
            props.setUser(res);
        }
        if (res.error) {
            setBadLogin(true)
        } 
      };


    return(
        <div>
            <Container id="formBackground">
            <h1>Login</h1>
    
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <FormGroup row>
                    <Label for="username" md={2} id="formLabels" >Username:</Label>
                    <Col md={9}>
                        <Input placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="password" sm={2} id="formLabels" >Password:</Label>
                    <Col md={9}>
                        <Input placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                    </Col>
                </FormGroup>
                {badLogin&&<p>Login failed</p>}

                <br />
                <ButtonToggle id="formButton" onClick={(e)=>handleSubmit(e)}>Submit</ButtonToggle>
            </Form>
            <br />
            <ButtonToggle id="formButton" onClick={()=>props.setShowWhich('signup')}>I need an account</ButtonToggle>

            </Container>

        </div>
    )
}
export default Login;