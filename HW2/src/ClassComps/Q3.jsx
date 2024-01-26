import { Component } from "react";

export default class Q3 extends Component{
    constructor(props){
        super(props)
        this.state={
            wid: "100%"
        };
    }

    oneClick=()=>{
        this.setState({wid:"50%"});
    }

    dbClick=()=>{
        this.setState({wid:"100%"});
    }

    render(){
        return(
            <div>
                <table border="1" style={{
                    borderCollapse: "collapse",
                    width: this.state.wid
                }} onClick={this.oneClick} onDoubleClick={this.dbClick}>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>6</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}