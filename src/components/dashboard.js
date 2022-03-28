import React,{Component} from "react";
import Container from "../../node_modules/react-bootstrap/Container";
import Row from "../../node_modules/react-bootstrap/Row";
import Col from "../../node_modules/react-bootstrap/Col";
import Card from "../../node_modules/react-bootstrap/Card";
import UserSideMenu from "./user-side-menu";
import {APP_LINKS} from "../config";

class Dashboard extends Component{

    navigate(dataA){
        if(this.getCookie("tkid").length>0){
            let formData = new FormData();
            let utk = this.getCookie("tkid");
            formData.append("tkid",utk);            
            if(dataA.target.dataset.val==="logout"){
                formData.append("logout","1");
            }      
            fetch(APP_LINKS.users,{
                method:"POST",
                body:formData
            })
            .then((response)=>{   
                if(response.status===200){
                    if(dataA.target.dataset.val==="logout"){
                        this.setCookie("tkid","",-1);
                        console.log("1");   
                    }
                    this.props.backNav(dataA.target.dataset.val);
                }
                else if(response.status===401){
                    this.setCookie("tkid","",-1);
                }
            })
            .catch((error)=>{    
                console.log("2");               
                this.props.backNav("form");
            });  
        }
    }

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }

    setCookie(cname, cvalue, exh) {
        var d = new Date();
        d.setTime(d.getTime() + (exh*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    render(){
        return(        
            <Container fluid className={"login-s1 bg-dark align-items-start p-0 py-5 d-flex minh-footer-adj "+this.props.classExt}>
                <Row className="mx-auto text-center w-100 mt-5">
                    <Col xs={12} md={3} className="mx-auto p-0 d-flex align-items-start p-3">
                        <UserSideMenu navigate={this.navigate.bind(this)} />
                    </Col>
                    <Col xs={12} md={9} className="mx-auto p-0 d-flex align-items-start p-3">
                        <Card className="w-100 minh-50vh bg-light border-secondary">
                            <Card.Body>
                                <p className="initialism text-secondary text-start border-bottom border-secondary mb-4">
                                    Dashboard
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>    
        );
    }
}

export default Dashboard;