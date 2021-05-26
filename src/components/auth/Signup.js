import { useState } from "react";
import Switch from "react-switch";
import {
  ButtonToggle,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Container,
} from "reactstrap";
import APIURL from "../../helpers/environment.js";

const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [takenUsername, setTakenUsername] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTakenUsername(false);
    
    const result = await fetch(`${APIURL}/user/create`, {
      method: "POST",
      body: JSON.stringify({
        userName: username,
        password: password,
        isAdmin: isAdmin
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    const res = await result.json();
    if (result.status === 200) {
      console.log("admin?", isAdmin);
      props.updateToken(res.sesionToken);
      props.setAdminLogin(isAdmin);
      props.setUser(res);
    }
    if (res.error) {
      if (res.error.name === "SequelizeUniqueConstraintError") {
        setTakenUsername(true);
      }
    }
  };
  const handleChange = nextChecked => {
    setChecked(nextChecked);
  };
  return (
    <div>
      <Container id="formBackground">
        <h1>Sign Up</h1>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <FormGroup row>
            <Label for="username" sm={2} style={{ textAlign: "right" }}>
              Username:
            </Label>
            <Col sm={9}>
              <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
            {takenUsername && <p>That username is not available</p>}
          </FormGroup>

          <FormGroup row>
            <Label for="password" sm={2} style={{ textAlign: "right" }}>
              Password:
            </Label>
            <Col sm={9}>
              <Input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            
          <Label for="admin" sm={2} style={{ textAlign: "right",marginTop:'0' }}>
              Admin? <Switch
                onChange={handleChange}
                checked={checked}
                className="react-switch"
              />
            </Label>
             
            {checked&&<Col sm={9}>
              <Input 
                placeholder="Enter the secret admin passwrod"
                onChange={(e) =>setIsAdmin(e.target.value==='secretadminpassword')
                }
              />
            </Col>}
            
          </FormGroup>
          <br />
          <br />
          <ButtonToggle id="formButton" onClick={(e) => handleSubmit(e)}>
            Submit
          </ButtonToggle>
        </Form>
        <br />
        <ButtonToggle
          id="formButton"
          onClick={() => props.setShowWhich("login")}
        >
          I have an account
        </ButtonToggle>
      </Container>
    </div>
  );
};
export default Signup;
