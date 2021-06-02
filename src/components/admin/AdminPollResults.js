import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "reactstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import PollResults from "../poll/PollResults";
import APIURL from "../../helpers/environment";
import Poll from "../poll/Poll";
import AdminPollHelper from "./AdminPollHelper";

const AdminPollResults = (props) => {
  //   const [options, setOptions] = useState([]);
  //   let [colorList, setColorList] = useState([]);
  const [polls, setPolls] = useState([]);
  const [allOptions, setAllOptions] = useState([]);
  //   const [pollData, setPollData] = useState([]);

  const getPolls = async () => {
    // console.log(props.sessionToken);
    const url = `${APIURL}/poll/`;
    const result = await fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.sessionToken,
      }),
    });
    if (result.status === 200) {
      const res = await result.json();
      // res.map((pollData)=>{
      setPolls(res);
      // getOptions(pollData.id)
      console.log("res", res);
      // })
    } else {
      console.log(`Failed poll fetch: ${result.err}`);
    }
  };

 

  const deletePoll = (poll) => {
    console.log(props.sessionToken);
    const url = `${APIURL}/poll/${poll.id}`;
    console.log("got to here in fetch");
    fetch(url, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.sessionToken,
      }),
    }).then(() => getPolls());
  };

  useEffect(() => {
    getPolls();
  }, []);

  const changeActive=async (poll) => {
      console.log(poll);
    const url = `${APIURL}/poll/${poll.id}`;
    const result = await fetch(url,{
        method:"PUT",
        body: JSON.stringify({
            question: poll.question,
            published: !poll.published,
            multiSelect: poll.multiSelect
          }),
        headers:new Headers({
            "Content-Type":"application/json",
            Authorization:props.sessionToken
        })
    })
    .then(()=>getPolls())
  }
  return (
    <Table style={{backgroundColor:"#C0C0C0"}}>
      <thead>
        <tr>
          <th>Poll question</th>
          <th>Results</th>
          <th>Active?</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {polls?.map((poll) => {
          return (
            <tr key={poll.id}>
              <td>{poll.question}</td>
              <td>
                  <AdminPollHelper sessionToken={props.sessionToken} poll={poll}/>
                  
              </td>
              <td><Button onClick={()=>changeActive(poll)}>{poll.published?"Yes":"No"}</Button></td>
              <td><Button onClick={()=>deletePoll(poll)}>Delete</Button></td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default AdminPollResults;
