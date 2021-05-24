import React from 'react';
import { Container, Button } from 'reactstrap';
import Image1 from "./assests/nathalia-segato-QIAtKF3pWqM-unsplash.jpg"


const SplashPage=(props)=>{
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
            </Container>
        </div>
    )
}

export default SplashPage;