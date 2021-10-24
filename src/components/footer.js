import React,{Component} from "react";
import Container from "../../node_modules/react-bootstrap/Container";
import Row from "../../node_modules/react-bootstrap/Row";
import Col from "../../node_modules/react-bootstrap/Col";
import {Link} from "react-router-dom";

class Footer extends Component{
    render(){
        return(      
            <footer className="text-white border-top bg-dark fixed-bottom opacity-8 py-1">
                <Container fluid className="z-index-0 text-shadow">
                    <Row className="mx-0 text-center w-100">
                        <Col xs={10} className="mx-auto">
                            <small className="my-0 text-white">
                                Copyright &copy; 2021 Tomasz Pankowski. All rights reserved. 
                                <Link to={this.props.privacyLink.href} className="text-white text-decoration-none ms-1">
                                     {this.props.privacyLink.name}
                                </Link>
                            </small>
                        </Col>
                    </Row>
                </Container> 
            </footer> 
        );
    }
}

export default Footer;