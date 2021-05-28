import React from 'react';
import { Container, Button } from 'reactstrap';
import Image1 from "./assests/nathalia-segato-QIAtKF3pWqM-unsplash.jpg"
import Preview from './components/poll/Preview'  //  previews poll questions
import {useState,useEffect} from 'react'


const SplashPage=(props)=>{
    const [showPreview, setShowPreview]=useState(false); // allow for unauthenticated users to see the polls
    return(
        <div >
            <Container id="splashPageBackground">
                <h1 id="splashPageHeader">Happy 10th Anniversary Company</h1>
                <h3 id="splashPageWords">A BlackTie Event and Stuff!</h3>
                <hr />
                <p id="splashPageDescription">We want to have an event on This Super Cool Date at This Super Cool Place.  </p>
                <p id="splashPageDescription">We need your input to make it Super Cool!</p>    
                <br />
                <Button size="lg" id="formButton" onClick={()=>props.setShowAuth(true)}>Please login to take our survey</Button>
                <br />
                <br />
                <img src={Image1} width="50%" />
                
                <br />
                <br />
                <Button size="lg" id="formPreviewButton" onClick={()=>setShowPreview(!showPreview)}>Preview Survey</Button>
                {showPreview ? <Preview/> : null}

            </Container>
        </div>
    )
}

export default SplashPage;