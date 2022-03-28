import React,{Component} from "react";
import LoginForm from "../components/login-form";

class Login extends Component{
    render(){
        return(          
            <main className="minh-footer-adj login-s1 d-flex align-items-center">    
                <LoginForm backLink={this.props.backLink}/>
            </main>
        );
    }
}

export default Login;