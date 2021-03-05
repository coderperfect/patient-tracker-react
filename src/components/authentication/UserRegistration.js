import React, { Component } from 'react';
import API from '../api/api';
import HomeComponent from './HomePage';
import LoadingComponent from "../LoadingComponent";
import 'bootstrap/dist/js/bootstrap.js';
import "./StyleSheet.css";
export default class UserRegistrationComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            role:localStorage.getItem("role"),
            firstName:"",           
            lastName:"",
            dateOfBirth:"",
            gender:"",
            contactNo:"",
            address:"",
            password:"",
            qualification:"",
            specialization:"",
            consultationFee:"",
            bloodGroup:"",
            doctorId:"",
            loaded:false
        }
        this.doctors=[];
    }
    
    async componentDidMount() {
        await API.get("doctors")
        .then(res => {
            // console.log(res.data);
            this.doctors=res.data;
            this.setState({loaded:true})
        })
    }

    handlevalidation=(e) =>{        
        e.preventDefault();
        var temp=document.getElementById('validation');            
        temp.innerHTML="";
        if(this.state.firstName==="")
            temp.innerHTML+=
            '   <li><font color="Red"> firstname cannot be empty</font></li>'            
        else if(/^[A-Za-z .'-]+$/.test(this.state.firstName)===false)
            temp.innerHTML+=
                '<li><font color="Red"> firstname is not valid</font></li>'            
        if(this.state.lastName==="")
            temp.innerHTML+=
                '<li><font color="Red"> lastname cannot be empty</font></li>'            
        else if(/^[A-Za-z .'-]+$/.test(this.state.lastName)===false)
            temp.innerHTML+=
                '<li><font color="Red"> lastname is not valid</font></li>'
        if(this.state.password==="")
            temp.innerHTML+=
                '<li><font color="Red"> Password cannot be empty</font></li>'       
        else if(this.state.password.length<6)
            temp.innerHTML+=
            '<li><font color="Red"> Password should be atleast six characters</font></li>'            
        else if(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/.test(this.state.password)===false)
            temp.innerHTML+=
            '<li><font color="Red"> Password should have atleast one alphabet and one special character</font></li>'
        if(this.state.address==="")
            temp.innerHTML+=
            '<li><font color="Red">Address cannot be empty</font></li>' 
        if(this.state.gender==="")         
            temp.innerHTML+=
            '<li><font color="Red"> Select a Gender</font></li>' 
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
        if(this.state.contactNo==="")    
            temp.innerHTML+=
            '<li><font color="Red"> Contact Number cannot be empty</font></li>'
        else if(/^[1-9][0-9]{9}$/.test(this.state.contactNo)===false)
            temp.innerHTML+=
            '<li><font color="Red"> Contact Number is not valid</font></li>'
        if(this.state.role==="ROLE_DOCTOR"){
            if(this.state.qualification==="")
                temp.innerHTML+=
                '<li><font color="Red">Qualification cannot be empty</font></li>' 
            if(this.state.specialization==="")
                temp.innerHTML+=
                '<li><font color="Red">Specialization cannot be empty</font></li>'
            if(this.state.consultationFee==="")
                temp.innerHTML+=
                '<li><font color="Red">ConsultationFee cannot be empty</font></li>'    
            else if(/^\d{0,32}(\.\d{0,2})$/.test(this.state.consultationFee)===false)
                temp.innerHTML+=
                '<li><font color="Red">ConsultationFee is not valid example: 150.0</font></li>'
        }
        else if(this.state.role==="ROLE_PATIENT"){
            if(this.state.bloodGroup==="")
                temp.innerHTML+=
                '<li><font color="Red">BloodGroup cannot be empty</font></li>'
            else if(/^(O|A|B|AB)(\+ve|-ve)$/.test(this.state.bloodGroup)===false)
                temp.innerHTML+=
                '<li><font color="Red">Enter a valid BloodGroup</font></li>'
        }

        if(temp.innerHTML==="")
            this.handleSubmit(e);
    }    

    handleSubmit = (e) => {
        e.preventDefault();   
        console.log(this.state);
        API.post("users/registration", this.state)
        .then(response =>{            
            document.getElementById('validation').innerHTML=""; 
            console.log(response)
           console.log("Registration Successful")
           alert(response.data)
           if (response.status === 200) 
            window.location = "/register" 
        }).catch(error => {                  
            document.getElementById('validation').innerHTML=
            '<li><font color="Red"> Registration Failed</font> </li>'            
        })
    } 

    handleChange= (e)=> {
        this.setState({[e.target.name]:e.target.value});        
     } 

    render() {
        if(!this.state.loaded) {
            return <LoadingComponent/>
        }
        return (
            <div>
                <h1 style={{color:'#3e5d7c'}}>User Registration</h1>
                <div className="container">
                <div id="validation"></div>                       
                <form onSubmit={this.handlevalidation}> 
                <div className="container">
                  <div className="row container register-form">
                    <div className="col-md-4 col-xs-4">
                    <div className="form-group">
                        <input required type="text" className="form-control"
                         name="firstName" id="firstName" placeholder="First Name *" 
                        value={this.state.firstName} onChange={this.handleChange}/>                                             
                    </div>
                    </div>
                    <div className="col-md-4 col-xs-4">
                    <div className="form-group">
                        <input required type="text" className="form-control" 
                        name="lastName" placeholder="Last Name *"
                        value={this.state.lastName} onChange={this.handleChange}/>
                    </div>
                    </div>
                    <div className="col-md-4 col-xs-4">
                    <div className="form-group">
                        <input required type="password" className="form-control" 
                        name="password" placeholder="Password *" 
                        value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    </div>

                   
                    <div className="col-md-4 col-xs-4">
                    <div className="form-group">
                        <input required type="text" className="form-control" 
                        name="address" placeholder="Address *"
                        value={this.state.address} onChange={this.handleChange}/>
                    </div>    
                    </div>
                    <div className="col-md-4 col-xs-4">
                    <div className="form-group">
                        <select required className="form-control" name="gender" style={{width:"300px"}}
                            onChange={this.handleChange}>
                            <option className="hidden" value="DEFAULT">
                                Select your Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Other</option>
                        </select>
                    </div> 
                    </div>    
                    <div className="col-md-4">
                    <div className="form-group">
                        <input required type="date" className="form-control"                             
                            name="dateOfBirth" placeholder="Date Of Birth *" 
                        value={this.state.dateOfBirth} onChange={this.handleChange}/>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="form-group">
                        <input required type="text" className="form-control" 
                        name="contactNo" placeholder="Contact *" 
                        value={this.state.contactNo} onChange={this.handleChange}/>
                    </div> 
                    </div>                  
                </div>
                
                {this.state.role==="ROLE_DOCTOR"?
                <div className="row register-form" style={{marginTop:"0px"}}>
                    <div className="col-md-4">
                    <div className="form-group">
                        <input required type="text" className="form-control" 
                        name="qualification" placeholder="Qualification *" 
                        value={this.state.qualification} onChange={this.handleChange}/>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="form-group" style={{paddingLeft:"4%"}}>
                        <input required type="text" className="form-control" 
                        name="specialization" placeholder="Specialization *" 
                        value={this.state.specialization} onChange={this.handleChange}/>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="form-group" style={{paddingLeft:"4%"}}>
                        <input required type="text" className="form-control" 
                        name="consultationFee" placeholder="Consultation Fee *" 
                        value={this.state.consultationFee} onChange={this.handleChange}/>
                    </div> 
                    </div>                   
                    </div>:""}

                    {this.state.role==="ROLE_PATIENT"?
                    <div className="row register-form" style={{marginTop:"0px"}}>
                    
                    <div className="col col-md-4">
                    <div className="form-group">
                        <input required type="text" className="form-control" 
                        name="bloodGroup" placeholder="BloodGroup *" 
                        value={this.state.bloodGroup} onChange={this.handleChange}/>
                    </div>
                    </div>
                    <div className="col col-md-4">
                    <div className="form-group">
                    <select required className="form-control" name="doctorId" style={{width:"300px"}}
                            onChange={this.handleChange}>
                        <option className="hidden" value="DEFAULT">
                            Select a doctor</option>                            
                        {   
                        this.doctors.map(details=>{
                            return(
                            <option key={details.doctorId} value={details.doctorId}>
                                {details.user.firstName+ " " + details.user.lastName}
                            </option>)
                        })}
                    </select>
                    </div>
                    </div>
                    </div>:""}
                    <div className="text-center">
                    <button type="Submit" className="btn btn-info">
                        Register</button>    
                    </div>                                     
                    </div>                                
            </form>
                <a className=""  href="Login">Login</a> 
                </div>
            </div>                           
        );
    }
}