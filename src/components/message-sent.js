import React, { Component } from "react";
import Container from "../../node_modules/react-bootstrap/Container";
import Row from "../../node_modules/react-bootstrap/Row";
import Col from "../../node_modules/react-bootstrap/Col";
import Button from "../../node_modules/react-bootstrap/Button";
import Card from "../../node_modules/react-bootstrap/Card";

class MessageSent extends Component {
    hndBack(){
        this.props.backNav("form");
    }
    render() {
        return (
            <Container fluid className={"contact-s2 align-items-center p-0 py-5 d-flex minh-50vh " + this.props.classExt}>
                <Row className="mx-auto text-center w-100">
                    <Col xs={10} md={6} className="mx-auto p-0 d-flex align-items-center">
                        <Card className="mx-auto bg-light-gray opacity-8 border-dark-gray shadow">
                            <Card.Header className="text-secondary text-start border-dark-gray">
                                Message sent!
                            </Card.Header>
                            <Card.Body className="text-center text-secondary p-5">
                                <p className="lead">Message was sent!</p>
                                <Button variant={"outline-secondary rounded-pill"} onClick={this.hndBack.bind(this)}>
                                    back to Form
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default MessageSent;