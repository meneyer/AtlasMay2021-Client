import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "reactstrap";
import APIURL from "../../helpers/environment";

const AdminPollHelper = (props) => {
  const [options, setOptions] = useState([]);

  const getOptions = async (poll) => {
    console.log(poll);
    const url = `${APIURL}/option/${poll.id}`;
    const result = await fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.sessionToken,
      }),
    });
    if (result.status === 200) {
      const res = await result.json();
      setOptions(res);
    } else {
      console.log(`Failed option fetch: ${result.err}`);
    }
  };
  useEffect(() => {
    getOptions(props.poll);
  }, []);

  return (
    <Table >
      <thead>
        <tr>
          <th>Option</th>
          <th># of Votes</th>
        </tr>
      </thead>
      <tbody>
        {options.map((option) => {
          return (
            <tr>
              <td>{option.text}</td>
              <td>{option.votes}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
export default AdminPollHelper;
