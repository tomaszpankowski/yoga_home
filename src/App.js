import React,{Component} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import ScrollToTop from "./components/scroll-top";
//---------------------------------------------------------
//components
import Navigation from "./components/navigation";
import Footer from "./components/footer";
//---------------------------------------------------------
import {appCfg} from "./config"; 
import "./scss/styles.scss";

class App extends Component{
    constructor(){
        super();
        this.state={
            routes: appCfg.routes
        };
    }
    render(){
        let switchContent = this.state.routes.map((item,idx)=>{
            if(item.exact){
                return <Route key={idx} exact path={item.path}>{item.view}</Route>;
            }
            return <Route key={idx} path={item.path}>{item.view}</Route>;
        });
        return(        
            <BrowserRouter>
                <ScrollToTop />
                <Navigation menuItems={this.state.routes}/>                 
                <Switch>
                    {switchContent}
                </Switch>   
                <Footer privacyLink={{name:"Privacy Policy",href:"/privacy"}} menuItems={this.state.routes}/>        
            </BrowserRouter>
        );
    }
}

export default App;