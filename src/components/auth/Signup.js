import { useState } from "react";
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
    }
    if (res.error) {
      if (res.error.name === "SequelizeUniqueConstraintError") {
        setTakenUsername(true);
      }
    }
  };
  return (
    <div>
      signup
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
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
      </form>
      <button onClick={() => props.setShowWhich("login")}>
        I have an account
      </button>
    </div>
  );
};
export default Signup;
