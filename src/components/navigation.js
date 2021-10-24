import React,{Component} from "react";
import {Link} from "react-router-dom";
import Nav from "../../node_modules/react-bootstrap/Nav";
import Navbar from "../../node_modules/react-bootstrap/Navbar";

class Navigation extends Component{
    render(){
        let menuContent = this.props.menuItems.filter((item)=>item.navItem).map((item,idx)=>{
            return <Nav.Item key={idx}>
                <Link to={item.path} className="nav-link fw-bold text-light-brw">
                    {item.name}
                </Link>
            </Nav.Item>;
        });
        return(
            <Navbar bg="transparent" variant="light" expand="md" className="position-absolute px-2 w-100 z-index-100" collapseOnSelect>
                <Navbar.Brand>
                    <Link to="/" className="font-weight-bold font-logo decoration-none text-green">
                        <img src="img/navbar_logo.png" alt="logo" className="me-2"/>                        
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle className="border-light"/>
                <Navbar.Collapse>
                    <Nav className="ms-auto text-end px-3 bg-md-white border-md-light-brw opacity-9">
                        {menuContent}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;