import React, { Component } from "react";
import {APP_LINKS} from "../config";
import Button from "../../node_modules/react-bootstrap/Button";
import Col from "../../node_modules/react-bootstrap/Col";
import Container from "../../node_modules/react-bootstrap/Container";
import Form from "../../node_modules/react-bootstrap/Form";
import Row from "../../node_modules/react-bootstrap/Row";
import update from "react-addons-update";
import cookieApi from "../api/cookie_api";
import contactFormApi from "../api/contact_form_api";

class ContactForm extends Component {
    constructor() {
        super();
        this.state = {
            formData: {
                emailAddress: "",
                firstName: "",
                lastName: "",
                messageText: "",
                phoneNumber: ""
            }
        };
    }
    updateFormData(ev) {
        var updateData;
        if (ev.target.name === "firstName") {
            updateData = update(this.state.formData, {
                firstName: { $set: ev.target.value }
            });
            this.setState({ formData: updateData });
        }
        else if (ev.target.name === "lastName") {
            updateData = update(this.state.formData, {
                lastName: { $set: ev.target.value }
            });
            this.setState({ formData: updateData });
        }
        else if (ev.target.name === "emailAddress") {
            updateData = update(this.state.formData, {
                emailAddress: { $set: ev.target.value }
            });
            this.setState({ formData: updateData });
        }
        else if (ev.target.name === "phoneNumber") {
            updateData = update(this.state.formData, {
                phoneNumber: { $set: ev.target.value }
            });
            this.setState({ formData: updateData });
        }
        else if (ev.target.name === "messageText") {
            updateData = update(this.state.formData, {
                messageText: { $set: ev.target.value }
            });
            this.setState({ formData: updateData });
        }
    }

    sendForm(){
        if(this.state.formData.firstName.length!==0
        && this.state.formData.lastName.length!==0
        && this.state.formData.emailAddress.length!==0
        && this.state.formData.phoneNumber.length!==0
        && this.state.formData.messageText.length!==0){
            let formData = contactFormApi.getFormData(this.state.formData,cookieApi.getCookie("msgcount"));
            contactFormApi.sendData(this.props.backNav,formData,cookieApi.getCookie,APP_LINKS.messages);
            this.clearForm();
        }
    }

    clearForm(){
        this.setState({ formData: contactFormApi.clearData() });      
    }

    render() {
        return (
            <Container fluid className={"contact-s2 align-items-center p-0 py-5 border-top border-secondary d-flex minh-50vh " + this.props.classExt}>
                <Row className="mx-auto text-center w-100">
                    <Col xs={11} md={6} className="mx-auto p-0 d-flex align-items-center">
                        <Form className="text-start w-100 border border-secondary p-4 rounded bg-light shadow text-secondary opacity-9 fw-bold"
                            autoComplete="off"
                            method="POST">
                            <div className="border-bottom border-secondary mb-4">
                                <p className="font-weight-bold mb-1">
                                    Contact online
                                </p>
                            </div>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter first name"
                                    className="rounded-pill border-secondary text-secondary"
                                    maxLength="50"
                                    name="firstName"
                                    onChange={this.updateFormData.bind(this)} 
                                    value={this.state.formData.firstName}
                                    required/>
                            </Form.Group>
                            <Form.Group controlId="formLastName" className="mt-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter last name"
                                    className="rounded-pill border-secondary text-secondary"
                                    maxLength="50"
                                    name="lastName"
                                    onChange={this.updateFormData.bind(this)} 
                                    value={this.state.formData.lastName}
                                    required/>
                            </Form.Group>
                            <Form.Group controlId="formEmail" className="mt-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                    placeholder="Enter email"
                                    className="rounded-pill border-secondary text-secondary"
                                    maxLength="50"
                                    name="emailAddress"
                                    onChange={this.updateFormData.bind(this)} 
                                    value={this.state.formData.emailAddress}
                                    required/>
                            </Form.Group>
                            <Form.Group controlId="formPhone" className="mt-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="tel"
                                    placeholder="Enter phone"
                                    className="rounded-pill border-secondary text-secondary"
                                    maxLength="15"
                                    name="phoneNumber"
                                    onChange={this.updateFormData.bind(this)} 
                                    value={this.state.formData.phoneNumber}
                                    required/>
                            </Form.Group>
                            <Form.Group controlId="formMessage" className="mt-3">
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea"
                                    rows={4}
                                    className="text-secondary border-secondary"
                                    maxLength="250"
                                    name="messageText"
                                    onChange={this.updateFormData.bind(this)} 
                                    value={this.state.formData.messageText}
                                    required/>
                            </Form.Group>
                            <div className="w-100 text-end mt-3">
                                <Button variant="outline-secondary"
                                    type="reset"
                                    onClick={this.clearForm.bind(this)}
                                    className="mx-1 rounded-pill">
                                    Clear
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    className="mx-1 rounded-pill"
                                    onClick={this.sendForm.bind(this)}>
                                    Send
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ContactForm;