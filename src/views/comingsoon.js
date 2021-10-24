import React,{Component} from "react";
import Container from "../../node_modules/react-bootstrap/Container";
import MsgBoxFs from "../components/msg_box_fs";
import {MESSAGES} from "../config";

class Comingsoon extends Component{
    render(){
        return(        
            <Container fluid className="comingsoon-s1 d-flex align-items-center minh-100vh">
                <MsgBoxFs content={MESSAGES.comingSoon}/>
            </Container>    
        );
    }
}

export default Comingsoon;