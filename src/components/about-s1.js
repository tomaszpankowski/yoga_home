import React,{Component} from "react";
import Container from "../../node_modules/react-bootstrap/Container";
import Row from "../../node_modules/react-bootstrap/Row";
import Col from "../../node_modules/react-bootstrap/Col";
import Button from "../../node_modules/react-bootstrap/Button";

class AboutS1 extends Component{
    render(){
        return(    
            <Container fluid className="d-flex minh-50vh align-items-center py-5 border-top border-secondary pt-5">
            <Row className="mx-0 w-100 mt-5">
                <Col xs={{span:12,order:1}} md={{span:7,order:2}} className="minh-25vh"></Col>
                <Col xs={{span:12,order:2}} md={{span:5,order:1}} className="minh-50vh d-flex align-items-center">
                    <div className="w-100 text-center text-md-start">
                        <h5 className="text-white">
                            Sed ut perspiciatis
                        </h5>
                        <h2 className="dispaly-6 fw-bold text-white-50 text-shadow">
                            Unde omnis iste
                        </h2>
                        <p className="text-white">
                            Natus error sit voluptatem accusantium doloremque laudantium, 
                            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis 
                            et quasi architecto beatae vitae dicta sunt explicabo. Nemo 
                            enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut 
                            fugit, sed quia consequuntur magni dolores eos qui ratione 
                            voluptatem sequi nesciunt. Neque porro quisquam est
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
        );
    }
}

export default AboutS1;