import { useState } from "react";
import {ButtonToggle, Form, FormGroup, Label, Input, Col} from 'reactstrap'
import APIURL from "../../helpers/environment.js";

const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [takenUsername, setTakenUsername] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTakenUsername(false);
    const result = await fetch(`${APIURL}/user/create`, {
      method: "POST",
      body: JSON.stringify({
        userName: username,
        password: password,
        isAdmin: isAdmin,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    const res = await result.json();
    if (result.status === 200) {
      props.updateToken(res.sesionToken);
      props.setAdminLogin(isAdmin);
      props.setUser(res);
    }
    if (res.error) {
      if (res.error.name === "SequelizeUniqueConstraintError") {
        setTakenUsername(true);
      }
    }
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
          <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          onClick={() => setIsAdmin(!isAdmin)}
          type="checkbox"
          id="admin"
          value={isAdmin}
        />
        {takenUsername && <p>That username is not available</p>}
        <label for="admin"> Admin user</label>
        <br />
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
     
      
            </Form>

<button onClick={() => props.setShowWhich("login")}>
        I have an account
      </button>

        </div>
    )
}
export default Signup;
