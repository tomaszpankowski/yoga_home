import React,{Component} from "react";
import Container from "../../node_modules/react-bootstrap/Container";
import ReviewsS1 from "../components/reviews-s1";
import ReviewsS2 from "../components/reviews-s2";

class Reviews extends Component{
    render(){
        return(        
            <Container fluid className="minh-footer-adj p-0">
                <ReviewsS1/>
                <ReviewsS2/>
            </Container>    
        );
    }
}

export default Reviews;