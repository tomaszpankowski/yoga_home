import React,{Component} from "react";
import Container from "../../node_modules/react-bootstrap/Container";
import AboutS1 from "../components/about-s1";
import AboutS2 from "../components/about-s2";
import AboutS3 from "../components/about-s3";

class About extends Component{
    render(){
        return(        
            <Container fluid className="minh-footer-adj p-0">
                <AboutS1/>
                <AboutS2/>
                <AboutS3/>
            </Container>    
        );
    }
}

export default About;