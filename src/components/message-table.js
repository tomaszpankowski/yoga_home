import React, { Component } from "react";
import Button from "../../node_modules/react-bootstrap/Button";
import Table from "../../node_modules/react-bootstrap/Table";
import {msgCfg} from "../config";
import update from "react-addons-update";

class MessageTable extends Component {
    constructor(){
        super();
        this.state ={
            page: 1,
        };
    }
    getList(){
        let listContent = this.props.contentData.filter((itm)=>{
            if(itm.firstname.indexOf(this.props.searchText)>=0
            || itm.lastname.indexOf(this.props.searchText)>=0
            || itm.email.indexOf(this.props.searchText)>=0){
                return true;
            }
            return false;
        })
        .map((item,idx)=>{
            if(idx>=((this.state.page-1)*msgCfg.pageSize) 
            && idx<((this.state.page)*msgCfg.pageSize)){
                return <tr key={item.id}
                    title="click to open"
                    className="text-secondary"
                    data-content={item.id}
                    data-val="details"
                    onClick={this.props.backNav.bind(this)}>
                    <td>{idx+1}</td>
                    <td>{item.firstname+" "+item.lastname}</td>
                    <td className="d-none d-sm-block">
                        {item.email}
                    </td>
                </tr>;
            }
            return null;
        });
        return listContent;
    }
    nextPage(){
        let p = this.state.page+1;
        if(p<=(Math.ceil(this.getList().length/msgCfg.pageSize))){
            let upd = update(this.state.page,{$set:p});
            this.setState({page: upd});
        }
    }
    prevPage(){
        let p = this.state.page-1;
        if(p>=1){
            let upd = update(this.state.page,{$set:p});
            this.setState({page: upd});
        }
    }
    render() {
        let listContent = this.getList();
        return (
            <div>
                <Table striped bordered hover className="text-start w-100 border-secondary">
                    <thead>
                        <tr className="text-secondary border-secondary">
                            <th>ID</th>
                            <th>Name</th>
                            <th className="d-none d-sm-block">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listContent}
                    </tbody>
                </Table>
                <div className="w-100 text-end">
                    <Button variant={"outline-secondary me-2"}
                        onClick={this.prevPage.bind(this)}>
                        &lt;
                    </Button>
                    <Button variant={"outline-secondary"}
                        onClick={this.nextPage.bind(this)}>
                        &gt;
                    </Button>
                </div>
            </div>
        );
    }
}

export default MessageTable;