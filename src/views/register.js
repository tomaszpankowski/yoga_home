import React,{Component} from "react";
import RegisterForm from "../components/register-form";

class Register extends Component{
    render(){
        return(          
            <main className="minh-100vh">    
                <RegisterForm backLink={this.props.backLink}/>
            </main>
        );
    }
}

export default Register;