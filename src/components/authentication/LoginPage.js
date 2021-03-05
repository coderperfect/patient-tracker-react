import React, { Component } from 'react';
import API from '../api/api';
import 'bootstrap/dist/js/bootstrap.js';
import "../Stylesheets/mystyle.css";
import {Link} from 'react-router-dom';
export default class LoginComponent extends Component{
    constructor(props){
        localStorage.setItem("token","");
        super(props);
        this.state={
            userId:"",
            role:localStorage.getItem("role"),
            password:"",
            invalid:"1px solid black",
            pinvalid:"1px solid black"
        }
    }

    handlevalidation=(e) =>{
        e.preventDefault();
        var temp=document.getElementById('validation');            
        temp.innerHTML="";
        if(this.state.userId==="") {
            temp.innerHTML+=
            '<li><font color="Red"> UserId cannot be empty</font></li>'  
            this.setState({invalid:"1px solid red"})
        }
                  
        else if(isNaN(this.state.userId)) {
            temp.innerHTML+=
            '<li><font color="Red"> UserId must be an Integer field</font></li>' 
            this.setState({invalid:"1px solid red"})
        }
                       
        if(this.state.password==="") {
            temp.innerHTML+=
            '<li><font color="Red"> Password cannot be empty</font></li>'
            this.setState({pinvalid:"1px solid red"})      
        }
             
        else if(this.state.password.length<6) {
            temp.innerHTML+=
            '<li><font color="Red"> Password should be atleast six characters</font></li>'
            this.setState({pinvalid:"1px solid red"})
        }
            
        else if  (/^(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-])[a-zA-Z0-9!@#$%^&*]{6,}$/.test(this.state.password)===false) {
            temp.innerHTML+=
            '<li><font color="Red"> Password should have atleast one alphabet and one special character</font></li>'
            this.setState({pinvalid:"1px solid red"})
        }
           
        if(temp.innerHTML==="")
            this.handleSubmit(e);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        API.post("users/login", this.state)
        .then(response =>{            
            document.getElementById('validation').innerHTML="";            
            // console.log("**"+response.data);  
         if(response.data.authToken.length>1) {
            localStorage.setItem("role",response.data.role);
            localStorage.setItem("token",response.data.authToken);
            localStorage.setItem("userId",response.data.userId);
            //localStorage.setItem("first",response.data.userId);
            //localStorage.setItem("last",response.data.userId);
            //localStorage.setItem("recordId",response.data.userId);
            var role = localStorage.getItem("role");
            if(role ==="ROLE_PATIENT") {
                window.location = "/patient";
            }
            else if(role ==="ROLE_ADMIN") {
                window.location = "/admin";
            }
            else if(role ==="ROLE_DOCTOR") {
                window.location = "/doctor";
            }
            else if(role ==="ROLE_CLERK") {
                window.location = "/clerk";
            }
         }
               
        }).catch(error => {   
            if (error.response.data.message==="Invalid User")   {
                document.getElementById('validation').innerHTML=
                '<li><font color="Red"> Please wait for login approval</font> </li>' 
            }   
            else if(error.response.data.message==="Rejected User") {
                document.getElementById('validation').innerHTML=
                '<li><font color="Red">Your approval is rejected</font> </li>' 
            }
            else {
                document.getElementById('validation').innerHTML=
            '<li><font color="Red"> Invalid userId/password</font> </li>'   
            }         
             
                    
        })
    } 

    handleChange= (e)=> {
        if(e.target.value.length>0) {
            if(e.target.name==="userId") {
                this.setState({invalid:"1px solid black"})
            }
            if(e.target.name==="userId") {
                this.setState({pinvalid:"1px solid black"})
            }
            
        }
        this.setState({[e.target.name]:e.target.value});
        
     } 

    render() {
        console.log(this.state.role);
        return (
            <div className="container row" >
           
            <div className="col-sm-10"><img src="http://localhost:3000/landing.jpg.png" height="70%"></img> </div>
            <div className="col-sm-2" style={{display:"flex",paddingTop:"70px"}}>  
                  
            <form  onSubmit={this.handlevalidation}>    
                  
            <div id="validation"></div>                            
                
            <div>    
            <input class="form-control" style={{ width:"300px", border:this.state.invalid}} type="text"  name="userId" 
                placeholder="Enter UserId" value={this.state.userId} onChange={this.handleChange}/>
                                                    
                  <br/>
                  
        <input placeholder="Enter Password" style={{ border:this.state.pinvalid}}  class="form-control" type="password" name="password" 
        value={this.state.password} onChange={this.handleChange}/>
                 
               
                      
                    
    <button type="submit" style={{marginTop:"20px"}} className="btn btn-info">Login</button>
    </div> 
            <div className='mt-4'>
               <Link className='mt-4' to="/forgotuserid">Forgot UserId</Link><br/>     
               <Link className='mt-4' to="/forgotpassword">Forgot Password</Link> 
            </div>
                                       
            </form>
            
        </div>
    </div>
                                   
        );
    }

}