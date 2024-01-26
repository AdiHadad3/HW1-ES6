import { Component } from "react";

export default class Q2 extends Component{
    
    constructor(props){
        super(props);
        this.state={
            val: null,
            gradeVis: 0
        }
    }
    enter=(inputVal)=>{
        this.setState({val:inputVal});
        this.setState({gradeVis: 0});
    }
    leave=(e)=>{
        if(e.target.value > 555){
            this.setState({gradeVis: 1});
        }
        else if(e.target.value!="")
        {
            this.setState({gradeVis: 2});
        }
        this.setState({val: null});
    }
    render(){
        return(
            <div>
        <form>
            <div>
                <p style={{display: this.state.val=='family'? 'block':'none', backgroundColor: 'red'}}>Fill your family name</p>
                <input type="text" onFocus={()=>{this.enter('family')}} onBlur={this.leave}/>
            </div>
            <div>
            <p style={{display: this.state.val=='first'? 'block':'none', backgroundColor: 'red'}}>Fill your first name</p>
                <input type="text" onFocus={()=>{this.enter('first')}} onBlur={this.leave}/>
            </div>
            <div id="gradeDiv">
            <p style={{display: this.state.val=='grade'? 'block':'none', backgroundColor: 'red'}}>Fill your grade</p>
                <input type="text" onFocus={()=>{this.enter('grade')}} onBlur={this.leave}/>
                <p style={{display: this.state.gradeVis==1 ? 'block': 'none'}}>You can be accepted for studies</p>
                <p style={{display: this.state.gradeVis==2 ? 'block': 'none'}}>You can try again next year</p>
            </div>
        </form>
        </div>
        );
    }
} 