import React, {useEffect, useState} from 'react';
import {
  Col,
  Container, 
  Row,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap'
import Poll from './Poll';
import APIURL from '../../helpers/environment'

const Preview = (props) => {

  const [polls, setPolls] = useState([]);

  const getPolls = () => {
    const url = `${APIURL}/poll/polls`
        console.log("got to here in fetch")
        fetch(url,
        {
            method: 'GET',
            headers: new Headers ({
            'Content-Type': 'application/json',
            })
        })
        .then((res) => {
          return res.json()
        })
        .then((pollData) => {
            setPolls(pollData)
            console.log(pollData);
        })
        .catch(err => console.log(`Failed poll fetch: ${err}`));
  }

  useEffect(() => {getPolls()}, []);

  const pollMapper = () => {
    return (
      <div>
        {polls.filter(poll => poll.published).map((poll, i) => {
            return(
              <div>
                <h4>{`Poll #${i+1}: ${poll.question}`}</h4>
              </div>
            )
          })
        }
      </div>
        
    )
  }

  return(
    <div>
      {pollMapper()}
    </div>
  )
}

export default Preview