import React,{Component} from "react";
import Container from "../../node_modules/react-bootstrap/Container";
import MsgBoxFs from "../components/msg_box_fs";
import {MESSAGES} from "../config";

class Error extends Component{
    render(){
        return(        
            <Container fluid className="error-s1 d-flex align-items-center minh-100vh">
                <MsgBoxFs content={MESSAGES.error404} backLink={this.props.backLink}/>
            </Container>    
        );
    }
}

export default Error;