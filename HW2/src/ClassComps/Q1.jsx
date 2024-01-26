import { Component } from "react";

export default class Q1 extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    changeColor= (e)=>{
        let bg= e.target.innerHTML; 
        this.setState({updateBg:bg})
    }

    render(){
        return(
        <div style={{
            background: this.state.updateBg
        }}>
        <button onClick={this.changeColor}>red</button>
        <button onClick={this.changeColor}>blue</button>
        <button onClick={this.changeColor}>pink</button>
        <button onClick={this.changeColor}>yellow</button><br />
        <button onClick={this.changeColor}>green</button>
        <button onClick={this.changeColor}>grey</button>
        <button onClick={this.changeColor}>purple</button>
        <button onClick={this.changeColor}>orange</button>
        </div>
        );
    }
}