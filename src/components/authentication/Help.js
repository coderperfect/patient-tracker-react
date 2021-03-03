import React, { Component } from 'react';
import  '../StyleSheet.css'
import API from '../api/api';
export default class HelpComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            issue:"",
            description:""
        }
    }
    handlevalidation=(e) =>{
        e.preventDefault();
        var temp=document.getElementById('validation');            
        temp.innerHTML="";
        if(this.state.issue==="")
        temp.innerHTML+=
            '<li><font color="Red"> Issue cannot be empty</font></li>'  
        if(this.state.description==="")
            temp.innerHTML+=
                '<li><font color="Red"> Description cannot be empty</font></li>' 
        if(temp.innerHTML==="")
            this.handleSubmit(e);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        API.post("users/help", this.state)
        .then(response =>{            
            document.getElementById('validation').innerHTML=""; 
           console.log("Details Saved");
           console.log(response);
        if (response.status === 200) 
            window.location = "/" 
        }).catch(error => {                  
            document.getElementById('validation').innerHTML=
            '<li><font color="Red"> Failed to Save the Details</font> </li>'            
        })
    } 

    handleChange= (e)=> {
        this.setState({[e.target.name]:e.target.value});
     } 

    render() {
        return (
            <div>
                <div className="center">
                <div id="validation"></div>                       
                <h1 style={{marginLeft:"40%"}}>Help</h1>
                    <form onSubmit={this.handlevalidation}>                        
                        <table>
                        <tbody>    
                        <tr>                      
                        <td>Issue</td>
                        <td><textarea rows = "2" cols = "35"
                        name="issue" value={this.state.issue} onChange={this.handleChange}>
                            </textarea></td>
                        </tr>
                        <tr>                        
                        <td>Description</td>
                        <td><textarea rows = "5" cols = "35" 
                        name="description" value={this.state.description} onChange={this.handleChange}>
                            </textarea></td>                        
                        </tr>
                        <tr>
                        <td colSpan="2" align="center">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                    </form>                    
                    <h3 style={{marginTop:"5%"}}>OR</h3>
                    <h4>Contact us: 1234567</h4>
                </div>
            </div>
        );
    }
}