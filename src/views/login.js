import React,{Component} from "react";
import LoginForm from "../components/login-form";
import LoginError from "../components/login-error";
import Dashboard from "../components/dashboard";
import MessagesList from "../components/message-list";
import update from "react-addons-update";

class Login extends Component{
    constructor(){
        super();
        this.state={
            navForm:"form"
        };
    }
    hndViewChange(ev){
        let upd = update(this.state,{navForm:{$set: ev}});
        this.setState(upd);
    }
    render(){
        let content;
        if(this.state.navForm==="form"){
            content = <LoginForm  backNav={this.hndViewChange.bind(this)} backLink={this.props.backLink}/>;
        }
        else if(this.state.navForm==="dashboard"){
            content = <Dashboard backNav={this.hndViewChange.bind(this)}/>
        }
        else if(this.state.navForm==="messages"){
            content = <MessagesList backNav={this.hndViewChange.bind(this)}/>
        }
        else if(this.state.navForm==="logout"){
            content = <LoginForm backNav={this.hndViewChange.bind(this)} backLink={this.props.backLink} />;
        }
        else{
            content = <LoginError backNav={this.hndViewChange.bind(this)}/>
        }
        return(        
            <main className="minh-footer-adj p-header bg-white">
                {content}
            </main>
        );
    }
}

export default Login;