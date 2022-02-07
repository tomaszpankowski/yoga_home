import React,{Component} from "react";
import Container from "../../node_modules/react-bootstrap/Container";
import CommunityS1 from "../components/community-s1";
import CommunityS2 from "../components/community-s2";

class Community extends Component{
    render(){
        return(        
            <Container fluid className="minh-footer-adj p-0">
                <CommunityS1/>
                <CommunityS2/>
            </Container>    
        );
    }
}

export default Community;