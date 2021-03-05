import React, { Component } from 'react';
import API from '../api/api';
import 'bootstrap/dist/js/bootstrap.js';
import "../Stylesheets/mystyle.css";
import {Alert} from "reactstrap";
import NewPassword from './NewPassword';
export default class  ForgotPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: '',
            mobileNo: '',
            dateOfBirth: '',
            userdata:null
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        API.post(`auth/forgotpassword`,this.state)
            .then(res => {
                localStorage.setItem("guest",JSON.stringify(res.data)); 
                localStorage.setItem("token",res.data.authToken); 
                window.location="/resetpassword";
            })
            .catch(error => {
                alert(error.response.data.message);
            })
    }

    handleValidation(event){
        var temp = document.getElementById('validation');
        temp.innerHTML = '';
        if(this.state.userId === "")
            temp.innerHTML += '<li><font color="red">Enter the UserId</font></li>';
        else if(/^[0-9]+$/.test(this.state.mobileNo) === false)
            temp.innerHTML += '<li><font color="red">Invalid UserId</font></li>'
        if(this.state.dateOfBirth==="")            
            temp.innerHTML+=
            '<li><font color="Red"> Enter the Date Of Birth</font></li>'
        else{
            const formatYmd = date => date.toISOString().slice(0, 10);
            var today=formatYmd(new Date());             
            if(this.state.dateOfBirth>today)
            temp.innerHTML+=
            '<li><font color="Red">Date Of Birth cannot be in future</font></li>'
        }        
        if(this.state.mobileNo==="")    
            temp.innerHTML+=
            '<li><font color="Red"> Contact Number cannot be empty</font></li>'
        else if(/^[1-9][0-9]{9}$/.test(this.state.mobileNo)===false)
            temp.innerHTML+=
            '<li><font color="Red"> Contact Number is not valid</font></li>'

        if(temp.innerHTML === '')
            this.handleSubmit(event);
    }

    handleChange =(event) => {
        //event.preventDefault();
        this.setState({[event.target.name]:event.target.value})
        }

    render(){
        
        
        return(
            <div className='container'>
                <div className='row'>
                <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <div id='validate'></div>
                        <form>
                        <Alert color="info">Forgot Password</Alert>
                            <div className='container row forgot'>
                                
                                <input required placeholder="Enter Userid" className="form-control" type='text' name='userId' value={this.state.userId} onChange={this.handleChange}/>
                            </div>
                            <div className='container row forgot'>
                                
                                
                                <input placeholder="Enter Contact No" required className="form-control" type='text' name='mobileNo' value={this.state.mobileNo} onChange={this.handleChange}/>
                            </div>
                            <div className='container row forgot'>
                                
                                <label><b>Provide Your Date Of Birth</b></label>
                                <input required placeholder="Enter your Date of Birth" type="date" className="form-control" name='dateOfBirth' value={this.state.dateOfBirth} onChange={this.handleChange}/>
                            </div>
                            <br/>
                            <button type='submit' onClick={this.handleSubmit} className='btn btn-info'>Submit</button>
                        </form>
                    </div>
                    <div className='col-md-3'></div>
                </div>
            </div>
        );
    }
}