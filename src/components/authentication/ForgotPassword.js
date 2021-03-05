import React, { Component } from 'react';
import API from '../api/api';
import 'bootstrap/dist/js/bootstrap.js';
import "../Stylesheets/mystyle.css";
import NewPassword from './NewPassword';
import {Alert, Form, Input, FormFeedback, Button} from 'reactstrap';
export default class  ForgotPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: '',
            userIdValidation : '',
            mobileNo: '',
            mobileValidation: '',
            dateOfBirth: '',
            dateOfBirthValidation: '',
            userdata:null
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        if(await this.handleValidation() === false)
            return;
        event.target.className += ' was-validated';
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

    async handleValidation(event){
        var valid = true;
        const formatYmd = date => date.toISOString().slice(0, 10);
        var today=formatYmd(new Date());
        if(this.state.userId === ''){
            await this.setState({userIdValidation: 'User ID cannot be empty'});
            valid = false;
        }
        else if(/^[0-9]+$/.test(this.state.userId) === false){
            await this.setState({userIdValidation: 'User ID is not valid'});
            valid = false;
        }
        else{
            await this.setState({userIdValidation: ''});
        }
        if(this.state.dateOfBirth===''){            
            await this.setState({dateOfBirthValidation: 'Date of Birth cannot be empty'});
            valid = false;
        }
        else if(this.state.dateOfBirth>today){             
            await this.setState({dateOfBirthValidation: 'Date of Birth is not valid'});
            valid = false;
        }
        else{
            await this.setState({dateOfBirthValidation: ''});
        }     
        if(this.state.mobileNo===''){    
            await this.setState({mobileValidation: 'Contact Number cannot be empty'});
            valid = false;
        }
        else if(/^[1-9][0-9]{9}$/.test(this.state.mobileNo)===false){
            await this.setState({mobileValidation: 'Contact Number is not valid'});
            valid = false;
        }
        else{
            await this.setState({mobileValidation: ''});
        } 
        return valid;
    }

    handleChange =(event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    render(){
        
        
        return(
            <div className='container'>
                <div className='row'>
                <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <div id='validate'></div>
                        <Form onSubmit={this.handleSubmit}>
                        <Alert color="info">Forgot Password</Alert>
                            <div className='container row forgot'>
                                
                                <Input invalid={this.state.userIdValidation.length === 0 ? false:true} placeholder="Enter Userid" className="form-control" type='text' name='userId' value={this.state.userId} onChange={this.handleChange}/>
                                <FormFeedback>{this.state.userIdValidation}</FormFeedback>
                            </div>
                            <div className='container row forgot'>
                                
                                
                                <Input invalid={this.state.mobileValidation.length === 0 ? false:true} placeholder="Enter Contact No" className="form-control" type='text' name='mobileNo' value={this.state.mobileNo} onChange={this.handleChange}/>
                                <FormFeedback>{this.state.mobileValidation}</FormFeedback>
                            </div>
                            <div className='container row forgot'>
                                
                                <label><b>Provide Your Date Of Birth</b></label>
                                <Input invalid={this.state.dateOfBirthValidation.length === 0 ? false:true} placeholder="Enter your Date of Birth" type="date" className="form-control" name='dateOfBirth' value={this.state.dateOfBirth} onChange={this.handleChange}/>
                                <FormFeedback>{this.state.dateOfBirthValidation}</FormFeedback>
                            </div>
                            <br/>
                            <Button type='submit' className='btn btn-info'>Submit</Button>
                        </Form>
                    </div>
                    <div className='col-md-3'></div>
                </div>
            </div>
        );
    }
}