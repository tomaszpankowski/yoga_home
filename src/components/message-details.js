import React, { Component } from "react";
import Button from "../../node_modules/react-bootstrap/Button";
import Table from "../../node_modules/react-bootstrap/Table";
import {APP_LINKS} from "../config";

class MessageDetails extends Component {
    hndBack(){
        this.props.backNav("list");
    }
    hndDelete(){        
        this.props.hndUpdate();
        this.props.backNav("list");
    }

    delete() {
        if (this.getCookie("tkid").length > 0) {
            let formData = new FormData();
            let utk = this.getCookie("tkid");
            formData.append("tkid", utk);
            formData.append("msgid",this.props.msgDetails.id);
            fetch(APP_LINKS.users, {
                method: "POST",
                body: formData
            })
            .then((response) => {
                if (response.status === 200) {
                    this.hndDelete();
                }
            })
            .catch((error) => {
                console.log(error);
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
    
    render() {
        let listContent=[];
        let cnt=0;
        for(let item in this.props.msgDetails){
            if(isNaN(item)){
                cnt++;
                listContent.push(
                    <tr key={cnt}
                        className="text-secondary text-start">
                        <th>{item.toUpperCase()}</th>
                        <td>{this.props.msgDetails[item]}</td>
                    </tr>                
                );
            }
        }
        
        return (
            <div>
                <Table striped bordered hover className="text-left w-100 border-secondary">
                    <thead>
                        <tr>
                            <th colSpan="2"
                                className="text-center text-secondary">                                
                                Message details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listContent}
                    </tbody>
                </Table>
                <div className="w-100 text-center">
                    <Button variant={"outline-dark rounded-pill text-secondary border-secondary me-2"}
                        className="float-left"
                        onClick={this.delete.bind(this)}>
                        Delete
                    </Button>
                    <Button variant={"outline-dark rounded-pill text-secondary border-secondary"}
                        className="float-right"
                        onClick={this.hndBack.bind(this)}>
                        Back
                    </Button>
                </div>
            </div>
        );
    }
}

export default MessageDetails;