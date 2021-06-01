import React from 'react';
import { Container, Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Image1 from "./assests/nathalia-segato-QIAtKF3pWqM-unsplash.jpg"
import Preview from './components/poll/Preview'  //  previews poll questions
import {useState,useEffect} from 'react'


const SplashPage=(props)=>{
    const [showPreview, setShowPreview]=useState(false); // allow for unauthenticated users to see the polls

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;

    return(
        <div >
            <Container id="splashPageBackground">
                <h1 id="splashPageHeader">Congratulations RDC!</h1>
                {/* <h3 id="splashPageWords">On Our 10 Year Anniversary!</h3> */}
                <hr />
                <h4 id="splashPageDescription">We are planning an event to celebrate our 10-year anniversary.</h4>
                <br />
                <h4 id="splashPageDescription">We want YOUR help to make it the celebration YOU deserve!</h4> 
                <br />
                <Container>
                    <Row>
                    <Col md="4"></Col>
                    <Col md="2">                
                        <Button size="lg" id="formButton" onClick={toggle}>Preview Survey</Button>
                    </Col>
                    <Col md="2">                
                        <Button size="lg" id="formButton" onClick={()=>props.setShowAuth(true)}>Login To Vote</Button>                 
                    </Col>
                    <Col md="4"></Col>
                    </Row>
                </Container>
                <Modal isOpen={modal} toggle={toggle} external={externalCloseBtn} id="modalBackground">
                    <ModalHeader style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#C5CDF1"}} ><Button size="lg" style={{backgroundColor: "#1E064B"}} onClick={()=>setShowPreview(!showPreview)}>Click to See Survey Questions</Button></ModalHeader>
                    <ModalBody style={{backgroundColor: "#C5CDF1"}}>
                        {showPreview ? <Preview/> : null}
                    </ModalBody>
                    <ModalFooter  style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#C5CDF1"}}>
                    <Button size="lg" style={{backgroundColor: "#1E064B"}} onClick={()=>props.setShowAuth(true)}>Login to Vote</Button>{' '}
                    {/* <Button style={{backgroundColor: "#1E064B"}} onClick={toggle}>Cancel</Button> */}
                    </ModalFooter>
                </Modal>
                <hr />   


                <img src={Image1} width="35%" alt=""/>             

            </Container>
        </div>
    )
}

export default SplashPage;