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
import loginFormApi from "../api/login_form_api";

class LoginForm extends Component{
    constructor() {
        super();
        this.state = {
            userData: {
                name: "",
                pass: ""
            }
        };
    }

    componentDidMount(){
        if(cookieApi.getCookie("tkid").length>0){
            let formData = loginFormApi.getTokenData(cookieApi.getCookie);
            loginFormApi.sendToken(this.props.backNav,cookieApi.setCookie,formData,APP_LINKS.users);
            this.clearForm();
        }
    }

    updateUserData(ev) {
        var updateData;
        if (ev.target.name === "userName") {
            updateData = update(this.state.userData, {
                name: { $set: ev.target.value }
            });
            this.setState({ userData: updateData });
        }
        else if (ev.target.name === "userPass") {
            updateData = update(this.state.userData, {
                pass: { $set: ev.target.value }
            });
            this.setState({ userData: updateData });
        }
    }

    sendForm(){
        if(this.state.userData.name.length!==0
        && this.state.userData.pass.length!==0){            
            let formData = loginFormApi.getLoginData(this.state.userData,cookieApi.getCookie);
            loginFormApi.sendData(this.props.backNav,formData,cookieApi.setCookie,APP_LINKS.users);
            this.clearForm();
        }
    }

    clearForm(){
        this.setState({userData: loginFormApi.getClearData()});        
    }

    render(){
        return(        
            <Container fluid className={"align-items-center p-0 py-5 d-flex "+this.props.classExt}>
                <Row className="mx-auto text-start w-100 pt-5">
                    <Col xs={11} md={5} lg={4} className="mx-auto p-0 d-flex align-items-center">
                        <Form className="text-start w-100 border border-secondary p-4 rounded bg-light shadow text-secondary opacity-9 fw-bold"
                            autoComplete="off"
                            method="POST">
                            <div className="border-bottom border-secondary mb-4">
                                <p className="fw-bold mb-1">
                                    User Login
                                </p>
                            </div>
                            <Form.Group controlId="formLogin">
                                <Form.Label>Login</Form.Label>
                                 <Form.Control type="text" 
                                    placeholder="Enter login" 
                                    className="rounded-pill border-secondary text-secondary"
                                    maxLength="50"
                                    name="userName"
                                    onChange={this.updateUserData.bind(this)} 
                                    value={this.state.userData.name}
                                    required/>
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" 
                                    placeholder="Enter password" 
                                    className="rounded-pill border-secondary text-secondary"
                                    maxLength="40"
                                    name="userPass"
                                    onChange={this.updateUserData.bind(this)} 
                                    value={this.state.userData.pass}
                                    required/>
                            </Form.Group>
                            <div className="w-100 text-start py-3">
                                <p className="text-secondary fw-normal">
                                    Not registered? 
                                    <Link to={this.props.backLink.href} className="text-secondary fw-bold text-decoration-none">
                                         {this.props.backLink.name}
                                    </Link>
                                </p>
                            </div>
                            <div className="w-100 text-end py-1">
                                <Button 
                                    variant="outline-secondary" 
                                    type="reset" 
                                    className="mx-1 rounded-pill">
                                    Clear
                                </Button>
                                <Button variant="outline-secondary" 
                                    className="mx-1 rounded-pill"
                                    onClick={this.sendForm.bind(this)}>
                                    Login
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>    
        );
    }
}

export default LoginForm;