import React,{Component} from "react";
import {APP_LINKS} from "../config";
import {Link} from "react-router-dom";
import Button from "../../node_modules/react-bootstrap/Button";
import Col from "../../node_modules/react-bootstrap/Col";
import Container from "../../node_modules/react-bootstrap/Container";
import Form from "../../node_modules/react-bootstrap/Form";
import Row from "../../node_modules/react-bootstrap/Row";
import update from "react-addons-update";
import cookieApi from "../api/cookie_api";
import registerFormApi from "../api/register_form_api";

class RegisterForm extends Component{
    constructor() {
        super();
        this.state = {
            userData: {
                firstName:"",
                lastName:"",
                emailAddr:"",
                userLogin:"",
                userPass:"",
                userPassConfirm:""
            }
        };
    }

    updateUserData(ev) {
        var updateData;
        if (ev.target.name === "firstName") {
            updateData = update(this.state.userData, {
                firstName: { $set: ev.target.value }
            });
            this.setState({ userData: updateData });
        }
        else if (ev.target.name === "lastName") {
            updateData = update(this.state.userData, {
                lastName: { $set: ev.target.value }
            });
            this.setState({ userData: updateData });
        }
        else if (ev.target.name === "emailAddr") {
            updateData = update(this.state.userData, {
                emailAddr: { $set: ev.target.value }
            });
            this.setState({ userData: updateData });
        }
        else if (ev.target.name === "userLogin") {
            updateData = update(this.state.userData, {
                userLogin: { $set: ev.target.value }
            });
            this.setState({ userData: updateData });
        }
        else if (ev.target.name === "userPass") {
            updateData = update(this.state.userData, {
                userPass: { $set: ev.target.value }
            });
            this.setState({ userData: updateData });
        }
        else if (ev.target.name === "userPassConfirm") {
            updateData = update(this.state.userData, {
                userPassConfirm: { $set: ev.target.value }
            });
            this.setState({ userData: updateData });
        }
    }

    sendForm(){ 
        if(this.state.userData.firstName.length!==0
        && this.state.userData.lastName.length!==0
        && this.state.userData.emailAddr.length!==0
        && this.state.userData.userLogin.length!==0
        && this.state.userData.userPass.length!==0
        && this.state.userData.userPassConfirm.length!==0
        && this.state.userData.userPass===this.state.userData.userPassConfirm){  
            let formData = registerFormApi.getRegisterData(this.state.userData,cookieApi.getCookie("regcount"));
            registerFormApi.sendData(this.props.backNav,formData,cookieApi.getCookie,APP_LINKS.register);
            this.clearForm();            
        }
    }

    clearForm(){
        this.setState({userData: registerFormApi.getClearData()});   
    }

    render(){
        return(        
            <Container fluid className={"register-form align-items-center p-0 py-5 d-flex minh-100vh "+this.props.classExt}>
                <Row className="mx-auto text-start w-100 pt-5">
                    <Col xs={11} md={6} lg={5} className="mx-auto p-0 d-flex align-items-center">
                        <Form className="text-start w-100 border border-dark-gray p-4 rounded bg-form shadow text-secondary opacity-9 fw-bold z-index-10"
                            autoComplete="off"
                            method="POST">
                            <div className="border-bottom border-dark-gray mb-4">
                                <p className="font-weight-bold mb-1">
                                    Register user
                                </p>
                            </div>
                            <Form.Group controlId="formFirst">
                                <Form.Label>First Name</Form.Label>
                                 <Form.Control type="text" 
                                    placeholder="Enter first name" 
                                    className="rounded-pill border-dark-gray text-secondary"
                                    maxLength="50"
                                    name="firstName"
                                    onChange={this.updateUserData.bind(this)} 
                                    value={this.state.userData.name}
                                    required/>
                            </Form.Group>
                            <Form.Group controlId="formLast" className="mt-3">
                                <Form.Label>Last Name</Form.Label>
                                 <Form.Control type="text" 
                                    placeholder="Enter last name" 
                                    className="rounded-pill border-dark-gray text-secondary"
                                    maxLength="50"
                                    name="lastName"
                                    onChange={this.updateUserData.bind(this)} 
                                    value={this.state.userData.name}
                                    required/>
                            </Form.Group>
                            <Form.Group controlId="formEmail" className="mt-3">
                                <Form.Label>Email</Form.Label>
                                 <Form.Control type="text" 
                                    placeholder="Enter email" 
                                    className="rounded-pill border-dark-gray text-secondary"
                                    maxLength="50"
                                    name="emailAddr"
                                    onChange={this.updateUserData.bind(this)} 
                                    value={this.state.userData.name}
                                    required/>
                            </Form.Group>
                            <Form.Group controlId="formLogin" className="mt-3">
                                <Form.Label>Login</Form.Label>
                                 <Form.Control type="text" 
                                    placeholder="Enter login" 
                                    className="rounded-pill border-dark-gray text-secondary"
                                    maxLength="50"
                                    name="userLogin"
                                    onChange={this.updateUserData.bind(this)} 
                                    value={this.state.userData.name}
                                    required/>
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" 
                                    placeholder="Enter password" 
                                    className="rounded-pill border-dark-gray text-secondary"
                                    maxLength="40"
                                    name="userPass"
                                    onChange={this.updateUserData.bind(this)} 
                                    value={this.state.userData.pass}
                                    required/>
                            </Form.Group>
                            <Form.Group controlId="formPasswordRepeat" className="mt-3">
                                <Form.Label>Password (repeat)</Form.Label>
                                <Form.Control type="password" 
                                    placeholder="Repeat password" 
                                    className="rounded-pill border-dark-gray text-secondary"
                                    maxLength="40"
                                    name="userPassConfirm"
                                    onChange={this.updateUserData.bind(this)} 
                                    value={this.state.userData.pass}
                                    required/>
                            </Form.Group>
                            <div className="w-100 text-start py-3">
                                <p className="text-secondary fw-normal">
                                    Registered? 
                                    <Link to={this.props.backLink.href} className="text-secondary fw-bold text-decoration-none">
                                         {this.props.backLink.name}
                                    </Link>
                                </p>
                            </div>
                            <div className="w-100 text-end py-2 border-top border-dark-gray">
                                <Button 
                                    variant="outline-secondary" 
                                    type="reset" 
                                    className="mx-1 rounded-pill">
                                    Clear
                                </Button>
                                <Button variant="outline-secondary" 
                                    className="mx-1 rounded-pill"
                                    onClick={this.sendForm.bind(this)}>
                                    Register
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>    
        );
    }
}

export default RegisterForm;