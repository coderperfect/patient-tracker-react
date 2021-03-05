import React, { Component } from "react";
import { Alert, Button, Col, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import API from "../api/api";
import LoadingComponent from "../LoadingComponent";
import TokenTimer from "./TokenTimer";

class NewPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            token: '',
            userData: null,
            newPassword: null,
            reNewPassword: null,
            newPasswordInvalid: false,
            reNewPasswordInvalid: false,
            newPasswordInvalidMessage: null,
            submitting: false,
            submittedResponse: null,
            guest : localStorage.getItem("guest")
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        switch(name) {
            case "newPassword":
                this.setState({
                    newPassword: value
                });
                break;
            case "reNewPassword":
                this.setState({
                    reNewPassword: value
                });
                break;
            default:
                break;
        }
    }

    async validate() {
        let valid = true;

        if(this.state.newPassword === null || this.state.newPassword.length === 0){
            valid = false;

            await this.setState({
                newPasswordInvalid: true,
                newPasswordInvalidMessage: "Please Enter New Password"
            });
        }
        else {
            await this.setState({
                newPasswordInvalid: false,
            });
        }

        if(this.state.reNewPassword !== this.state.newPassword){
            valid = false;

            await this.setState({
                reNewPasswordInvalid: true
            });
        }
        else {
            await this.setState({
                reNewPasswordInvalid: false,
            });
        }


        if((this.state.newPassword !== null) 
            && /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/
                .test(this.state.newPassword)===false) {
            
            valid = false;

            await this.setState({
                newPasswordInvalid: true,
                newPasswordInvalidMessage: "Password should have atleast one alphabet and one special character"
            });
        }
        else if(this.state.newPassword !== null) {
            await this.setState({
                newPasswordInvalid: false,
            });
        }

        return valid;
    }
    
    async handleSubmit(event) {
        event.preventDefault();

        if(await this.validate() === false){
            return;
        }
       
        try {
            //console.log(this.state.guest);
            var guest2=JSON.parse(localStorage.getItem("guest"));
            guest2.password = this.state.newPassword;
            const response = await API.post(
                `auth/resetpassword/`,guest2
            );

            if(!(response.status==200)){
                await this.setState({
                    submitting: true
                })
            }
            else {
                //alert(response.status);
                await this.setState({
                    submitting: false,
                    submittedResponse: response.data
                  
                })
                setTimeout(() => {
                    window.location = "/login";
                },2000);
                
            }
                
        }
        catch(error) {
            alert(error);
        }
    }

    renderContent = () => {
        let contentsAfterReset = (
            <Alert color="success">
                <h4 className="alert-heading">Password Changed successfully</h4>
                <p>
                    Please login with your new password.
                </p>
            </Alert>
        );

        let contentsBeforeReset = (
            <Form className="container mt-5" onSubmit={this.handleSubmit.bind(this)}>
                <TokenTimer/>
                <FormGroup row>
                    
                    <Col sm={3}>
                        <Input placeholder = "Enter New Password: " invalid={this.state.newPasswordInvalid} type="password" id="newPassword" name="newPassword" onChange={(event) => {this.handleChange(event)}}/>
                        <FormFeedback>{this.state.newPasswordInvalidMessage}</FormFeedback>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    
                    <Col sm={3}>
                        <Input placeholder="Re-enter New Password:" invalid={this.state.reNewPasswordInvalid} type="password" id="reNewPassword" name="reNewPassword" onChange={(event) => {this.handleChange(event)}}/>
                        <FormFeedback>Passwords Do Not Match</FormFeedback>
                    </Col>
                </FormGroup>

                <FormGroup row>
                <Col sm={3}>
                        <Button color="info" type="submit">Change Password</Button>
                        </Col>
                </FormGroup>
            </Form>
        );

        if(!this.state.submitting && (this.state.submittedResponse === null))
            return contentsBeforeReset;

        if(!this.state.submitting && (this.state.submittedResponse !== null))
            return contentsAfterReset;

        return (
            <LoadingComponent/>
        )
    }

    render() {
        return (
            this.renderContent()
        );
    }
}

export default NewPassword;