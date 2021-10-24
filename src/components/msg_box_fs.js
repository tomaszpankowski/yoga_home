import React,{Component} from "react";
import Row from "../../node_modules/react-bootstrap/Row";
import Col from "../../node_modules/react-bootstrap/Col";
import {Link} from "react-router-dom";

class MsgBoxFs extends Component{
    render(){
        let link = "";
        if(this.props.backLink!==undefined){
            link = <Link to={this.props.backLink.href} className="btn btn-outline-light d-inline rounded-pill mt-3">
                {this.props.backLink.name}
            </Link>
        }
        return(        
            <Row className="mx-auto text-center d-flex w-100">
                <Col xs={10} sm={8} md={6} lg={5} className="mx-auto text-white text-shadow">
                    <div className="card bg-dark text-white box-shadow p-4 opacity-8 border-secondary">
                        <h1 className="display-4 font-weight-bold font-logo">
                            {this.props.content.title}
                        </h1>
                        <p className="lead">
                            {this.props.content.text}
                        </p>
                        <div className="w-100 text-center">
                            {link}
                        </div>
                    </div>
                </Col>
            </Row>            
        );
    }
}

export default MsgBoxFs;