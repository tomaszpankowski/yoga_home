import React,{Component} from "react";
import Container from "../../node_modules/react-bootstrap/Container";
import Row from "../../node_modules/react-bootstrap/Row";
import Card from "../../node_modules/react-bootstrap/Card";
import Col from "../../node_modules/react-bootstrap/Col";
import Button from "../../node_modules/react-bootstrap/Button";

class BlogS2 extends Component{
    render(){
        return(    
            <Container fluid className="d-flex minh-50vh bg-light align-items-center py-5 border-top">
                <Row className="mx-0 w-100">
                    <Col xs={10} sm={8} lg={7} className="mx-auto">                        
                        <Card className="w-100 text-start mb-4">
                            <Row>
                                <Col xs={4} className="bg-secondary">
                                    <Card.Img src="..." alt="..."/>
                                </Col>
                                <Col xs={8}>
                                    <Card.Body>
                                        <h2 className="dispaly-6 fw-bold text-secondary">
                                            Lorem ipsum dolor
                                        </h2>
                                        <h5 className="initialism mt-5 mb-3">
                                            Nostrud exercitation
                                        </h5>
                                        <p className="initialism text-muted">
                                            Sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                                            veniam, quis nostrud exercitation ullamco laboris nisi ut 
                                            aliquip ex ea commodo consequat. 
                                        </p>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>                                             
                        <Card className="w-100 text-start mb-4">
                            <Row>
                                <Col xs={4} className="bg-secondary">
                                    <Card.Img src="..." alt="..."/>
                                </Col>
                                <Col xs={8}>
                                    <Card.Body>
                                        <h2 className="dispaly-6 fw-bold text-secondary">
                                            Lorem ipsum dolor
                                        </h2>
                                        <h5 className="initialism mt-5 mb-3">
                                            Nostrud exercitation
                                        </h5>
                                        <p className="initialism text-muted">
                                            Sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                                            veniam, quis nostrud exercitation ullamco laboris nisi ut 
                                            aliquip ex ea commodo consequat. 
                                        </p>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>                     
                        <Card className="w-100 text-start mb-4">
                            <Row>
                                <Col xs={4} className="bg-secondary">
                                    <Card.Img src="..." alt="..."/>
                                </Col>
                                <Col xs={8}>
                                    <Card.Body>
                                        <h2 className="dispaly-6 fw-bold text-secondary">
                                            Lorem ipsum dolor
                                        </h2>
                                        <h5 className="initialism mt-5 mb-3">
                                            Nostrud exercitation
                                        </h5>
                                        <p className="initialism text-muted">
                                            Sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                                            veniam, quis nostrud exercitation ullamco laboris nisi ut 
                                            aliquip ex ea commodo consequat. 
                                        </p>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default BlogS2;