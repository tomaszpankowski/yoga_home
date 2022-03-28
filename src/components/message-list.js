import React, { Component } from "react";
import Container from "../../node_modules/react-bootstrap/Container";
import Row from "../../node_modules/react-bootstrap/Row";
import Col from "../../node_modules/react-bootstrap/Col";
import Card from "../../node_modules/react-bootstrap/Card";
import UserSideMenu from "./user-side-menu";
import MessageTable from "./message-table";
import update from "react-addons-update";
import SearchBar from "./search-bar";
import MessageDetails from "./message-details";
import {APP_LINKS} from "../config";

class MessageList extends Component {
    constructor() {
        super();
        this.state = {
            msgList:[],
            searchText:"",
            navForm:"list",
            detailsId:-1
        };
    }

    componentDidMount() {
        this.getMessageList();
    }

    getMessageList(){
        if (this.getCookie("tkid").length > 0) {
            let formData = new FormData();
            let utk = this.getCookie("tkid");
            formData.append("tkid", utk);
            formData.append("messages","1");
            fetch(APP_LINKS.users, {
                method: "POST",
                body: formData
            })
            .then((response)=>response.json())
            .then((data)=>this.loadData(data))
            .catch((error) => console.log(error));
        }
    }

    loadData(dataA){
        if(Array.isArray(dataA)){
            let upd = update(this.state.msgList,{$set:dataA});
            this.setState({msgList:upd});
        }
    }

    navigate(dataA) {
        if (this.getCookie("tkid").length > 0) {
            let formData = new FormData();
            let utk = this.getCookie("tkid");
            formData.append("tkid", utk);
            if (dataA.target.dataset.val === "logout") {
                formData.append("logout", "1");
            }
            fetch(APP_LINKS.users, {
                method: "POST",
                body: formData
            })
                .then((response) => {
                    if (response.status === 200) {
                        if (dataA.target.dataset.val === "logout") {
                            this.setCookie("tkid", "", -1);
                        }
                        this.props.backNav(dataA.target.dataset.val);
                    }
                    else if (response.status === 401) {
                        this.setCookie("tkid", "", -1);
                    }
                })
                .catch((error) => {
                    this.props.backNav("form");
                });
        }
    }

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    setCookie(cname, cvalue, exh) {
        var d = new Date();
        d.setTime(d.getTime() + (exh * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    hndUpdate(ev){
        let upd = update(this.state.searchText,{$set:ev.target.value});
        this.setState({searchText:upd});
    }


    hndViewChange(ev){
        let detId =-1;
        if(ev.target!==undefined){
            detId = ev.target.parentElement.dataset.content-1;
        }
        let upd = update(this.state,{
            navForm:{$set: ev},
            detailsId:{$set:detId}
        });
        this.setState(upd);
    }

    render() {let content;
        if(this.state.navForm==="list"){
            content = <div>
                <div className="w-100 mb-4">
                    <SearchBar hndUpdate={this.hndUpdate.bind(this)}/>
                </div>
                <div className="w-100">
                    <MessageTable contentData={this.state.msgList} 
                        searchText={this.state.searchText}
                        backNav={this.hndViewChange.bind(this)}/>
                </div>
            </div>;
        }
        else if(this.state.detailsId>=0){
            let res=0;
            for(let n=0;n<this.state.msgList.length;n++){
                if(this.state.msgList[n].id===this.state.detailsId){
                    res=n;
                    break;
                }
            }
            content = <MessageDetails msgDetails={this.state.msgList[res]} 
                backNav={this.hndViewChange.bind(this)}
                hndUpdate={this.getMessageList.bind(this)}/>;            
        }
        return (
            <Container fluid className={"login-s1 align-items-start p-0 py-5 bg-dark d-flex minh-100vh " + this.props.classExt}>
                <Row className="mx-auto text-center w-100 mt-5">
                    <Col xs={12} md={3} className="mx-auto p-0 d-flex align-items-start p-3">
                        <UserSideMenu navigate={this.navigate.bind(this)} />
                    </Col>
                    <Col xs={12} md={9} className="mx-auto p-0 d-flex align-items-start p-3">
                        <Card className="w-100 minh-50vh bg-light border-secondary">
                            <Card.Body>
                                <p className="initialism text-secondary text-start border-bottom border-secondary mb-4">
                                    Messages
                                </p>
                                {content}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default MessageList;