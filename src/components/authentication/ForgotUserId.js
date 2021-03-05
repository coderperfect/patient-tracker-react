import React, { Component } from 'react';
import API from '../api/api';
import {Alert, Form, Input, FormFeedback, Button} from 'reactstrap';

class ForgotUserId extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: -1,
            mobileNo: '',
            mobileValidation: '',
            dateOfBirth: '',
            dateOfBirthValidation: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        if(await this.handleValidation() === false)
            return;
        event.target.className += ' was-validated';
        API.post(`auth/forgotuserid`,this.state)
            .then(res => {
                alert(res.data);
                window.location = '/login';
            })
            .catch(error => {
                alert(error.response.data.message);
            })
    }

    async handleValidation(event){
        var valid = true;
        const formatYmd = date => date.toISOString().slice(0, 10);
        var today=formatYmd(new Date());
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

    handleChange(event){
        this.setState({[event.target.name] : [event.target.value]});
    }

    render(){
        return(
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                        <Alert color='info' className='text-center'><b>Forgot UserId Form</b></Alert>
                        <Form className='needs-validation' onSubmit={this.handleSubmit} noValidate>
                            <div className='mb-3'>
                                <label className='form-label'>Enter your Contact Number</label>
                                <Input invalid={this.state.mobileValidation.length === 0 ? false:true} className='form-control' type='text' name='mobileNo' value={this.state.mobileNo} onChange={this.handleChange}/>
                                <FormFeedback>{this.state.mobileValidation}</FormFeedback>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Enter your Date of Birth</label>
                                <Input invalid={this.state.dateOfBirthValidation.length === 0 ? false:true} className='form-control' type='date' name='dateOfBirth' value={this.state.dateOfBirth} onChange={this.handleChange}/>
                                <FormFeedback>{this.state.dateOfBirthValidation}</FormFeedback>
                            </div>
                            <Button type='submit' className='btn btn-info'>Submit</Button>
                        </Form>
                    </div>
                    <div className='col-md-2'></div>
                </div>
            </div>
        );
    }
}

export default ForgotUserId;