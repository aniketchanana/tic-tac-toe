import React, { Component } from 'react';
import './Cell.css';
class  Cell extends Component{
    constructor(){
        super();
        this.handelClick = this.handelClick.bind(this);
    }
    handelClick(evt){
        if(evt.target.value !== "")
        return;
        this.props.clicked(evt.target.id.split("-"));
    }
    render(){
        return(
            <button 
            className="cell" 
            onClick={this.handelClick} 
            id={this.props.id}
            value={this.props.value}
            >{this.props.value===""?".":this.props.value}</button>
        )
    }
}

export default Cell;