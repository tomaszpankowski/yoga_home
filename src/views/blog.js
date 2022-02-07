import React,{Component} from "react";
import Container from "../../node_modules/react-bootstrap/Container";
import BlogS1 from "../components/blog-s1";
import BlogS2 from "../components/blog-s2";

class Blog extends Component{
    render(){
        return(        
            <Container fluid className="minh-footer-adj p-0">
                <BlogS1/>
                <BlogS2/>
            </Container>    
        );
    }
}

export default Blog;