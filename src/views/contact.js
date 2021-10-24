import React,{Component} from "react";
import ContactData from "../components/contact-data";
import ContactForm from "../components/contact-form";
import MessageError from "../components/message-error";
import MessageSent from "../components/message-sent";
import update from "react-addons-update";

class Contact extends Component{
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
            content = <ContactForm backNav={this.hndViewChange.bind(this)}/>;
        }
        else if(this.state.navForm==="confirm"){
            content = <MessageSent backNav={this.hndViewChange.bind(this)}/>
        }
        else{
            content = <MessageError backNav={this.hndViewChange.bind(this)}/>
        }
        return(          
            <main className="minh-100vh contact-bg">  
                <ContactData/>
                {content}
            </main>
        );
    }
}

export default Contact;