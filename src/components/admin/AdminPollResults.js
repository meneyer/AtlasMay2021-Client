import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Button} from 'reactstrap'
import {Bar, Doughnut} from 'react-chartjs-2';
import APIURL from '../../helpers/environment'


const AdminPollResults =(props)=>{
    let options = props.options;
    let votes = props.votes;
    let [colorList, setColorList] = useState([]);
    const [polls, setPolls] = useState([]);
    
    const getPolls = () => {
        console.log(props.sessionToken)
        const url = `${APIURL}/poll/`
            console.log("got to here in fetch")
            fetch(url,
            {
                method: 'GET',
                headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
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

    const deletePollResults = (polls) => {
        console.log(props.sessionToken)
        const url = `${APIURL}/poll/:id`
        console.log("got to here in fetch")
        fetch(url,
        {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            })
        })
        .then(() => props.getPolls())
    }



const pollMapper = () => {
    return props.options.map((options) => {
        return (
            <div>

                <Button onClick={() => {props.getPolls(options)}}>Get All Poll Results</Button>
                <Button onClick={() => {deletePollResults(polls)}}>delete</Button>
            </div>
        )

    })
    
}


    let randColor = () => {
        let randRGB = []
        for(let i = 0; i < 3; i++){
          randRGB.push(Math.floor((Math.random() * 256)))
        }
        return randRGB;
    }
    
    let makeColorList = () => {
        let cl = [];
        for(let i = 0; i < votes.length; i++){
        cl.push(randColor())
        }
        setColorList(cl);
    }
    
    useEffect(() => {
        makeColorList();
        getPolls()
    }, []);
    
    let genBackgroundColors = () => {
        return colorList.map(color => `rbga(${color[0]}, ${color[1]}, ${color[2]}, 0.2)`)
    }
    
    let genBorderColors = () => {
        return colorList.map(color => `rbga(${color[0]}, ${color[1]}, ${color[2]}, 1)`)
    }

    const data = {
        labels: options.map(option => option.text),
        datasets: [
            {
                label: '# of Votes',
                data: votes,
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                },
            
        ]
    }
    return(
        <div>
            <Container className="poll-results-main">
      {/* <button onClick={randColor}>Color</button> */}
    <Row className="poll-results-header"> 
        <h2> Results</h2>
        <Bar data={data} options={options} />
        {pollMapper()}
    </Row>
    
    </Container>
        </div>
    )
}

export default AdminPollResults;
