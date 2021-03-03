import React, { Component } from 'react';
import API from '../api/api';
import LoadingComponent from '../LoadingComponent';
export default class UserRegistrationComponent extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state={
            role:"ROLE_PATIENT",
            firstName:props.location.aboutProps.edit.user.firstName,           
            lastName:props.location.aboutProps.edit.user.lastName,
            dateOfBirth:props.location.aboutProps.edit.user.dateOfBirth,
            gender:props.location.aboutProps.edit.user.gender,
            contactNo:props.location.aboutProps.edit.user.contactNo,
            address:props.location.aboutProps.edit.user.address,
            password:props.location.aboutProps.edit.user.password,
            qualification:"",
            specialization:"",
            consultationFee:"",
            bloodGroup:props.location.aboutProps.edit.bloodGroup,
            doctorId:"",
            patientId:props.location.aboutProps.edit.patientId,
            userId:props.location.aboutProps.edit.patientId,
            loaded:false
        }
        //this.loaded=false;
        this.doctors=[];
    }
   
    async componentDidMount() {
        await API.get("doctors")
        .then(res => {
            console.log(res.data);
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
            var dates = this.state.dateOfBirth.split("/");
            const d = new Date(dates[2], dates[1]-1, dates[0]);
            if(dates[2].length!=4) {
                temp.innerHTML+=
            '<li><font color="Red">Date Of Birth is invalid/ correct format is (dd/mm/yyyy)</font></li>'
            }
            console.log(dates)
            var today=new Date(); 
            console.log(today,d)            
            if(d>today)
            temp.innerHTML+=
            '<li><font color="Red">Date Of Birth is invalid</font></li>'
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
        var dates = this.state.dateOfBirth.split("/")
        this.state.dateOfBirth = dates[2]+"-"+dates[1]+"-"+dates[0];
        console.log(this.state.dateOfBirth)
        API.post("users/registration", this.state)
        .then(response =>{            
            document.getElementById('validation').innerHTML=""; 
            console.log(response)
           console.log("Registration Successful")
           alert(response.data)
           if (response.status === 200) 
            window.location = "/admin/patient-list";
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
        
          return  (
          <div>
                <div className="container">
                <div id="validation"></div>                       
                <form onSubmit={this.handlevalidation}>   
                <div className="containe">
                  <div className="row register-form">
                    <div className="col-md-4">
                    <div className="form-group">
                        <input type="text" className="form-control"
                         name="firstName" placeholder="First Name *" 
                        value={this.state.firstName} onChange={this.handleChange}/>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="form-group">
                        <input type="text" className="form-control" 
                        name="lastName" placeholder="Last Name *"
                        value={this.state.lastName} onChange={this.handleChange}/>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="form-group">
                        <input type="text" className="form-control" 
                        name="password" placeholder="Password *" 
                        value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    </div>

                    
                    <div className="col-md-4">
                    <div className="form-group">
                        <input type="text" className="form-control" 
                        name="address" placeholder="Address *"
                        value={this.state.address} onChange={this.handleChange}/>
                    </div>    
                    </div>
                    <div className="col-md-4">
                    <div className="form-group">
                    <input type="text" className="form-control" 
                        name="gender" placeholder="Gender *"
                        value={this.state.gender} onChange={this.handleChange}/>
                       
                    </div> 
                    </div>    
                    <div className="col-md-4">
                    <div className="form-group">
                        <input type="text" className="form-control"                             
                            name="dateOfBirth" placeholder="Date Of Birth *" 
                        value={this.state.dateOfBirth} onChange={this.handleChange}/>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="form-group">
                        <input type="text" className="form-control" 
                        name="contactNo" placeholder="Contact *" 
                        value={this.state.contactNo} onChange={this.handleChange}/>
                    </div> 
                    </div>                  
                </div>
                {this.state.role==="ROLE_DOCTOR"?
                <div className="row register-form" style={{marginTop:"0px"}}>
                    <div className="col-md-4">
                    <div className="form-group">
                        <input type="text" className="form-control" 
                        name="qualification" placeholder="Qualification *" 
                        value={this.state.qualification} onChange={this.handleChange}/>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="form-group" style={{paddingLeft:"4%"}}>
                        <input type="text" className="form-control" 
                        name="specialization" placeholder="Specialization *" 
                        value={this.state.specialization} onChange={this.handleChange}/>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="form-group" style={{paddingLeft:"4%"}}>
                        <input type="text" className="form-control" 
                        name="consultationFee" placeholder="Consultation Fee *" 
                        value={this.state.consultationFee} onChange={this.handleChange}/>
                    </div> 
                    </div>                   
                    </div>:""}

                    {
                    this.state.role==="ROLE_PATIENT"?
                    <div className="row register-form" style={{marginTop:"0px"}}>
                    <div className="col-md-4">
                    <div className="form-group">
                        <input type="text" className="form-control" 
                        name="bloodGroup" placeholder="BloodGroup *" 
                        value={this.state.bloodGroup} onChange={this.handleChange}/>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="form-group">
                    <select className="form-control" name="doctorId" 
                            onChange={this.handleChange}>
                            <option className="hidden" value="DEFAULT">
                                Select a doctor</option>                            
                            {
                                
                            this.doctors.map(details=>{
                               
    return <option key={details.doctorId} value={details.doctorId}>{details.user.firstName + " " + details.user.lastName}</option>
                            })
                            }

                        </select>
                    </div>
                    </div>
                    </div>:""}
                    <div className="text-center">
                    <button type="Submit" className="btn btn-primary">
                        Edit</button>    
                    </div>                                     
                    </div>                                
            </form>
                <a className="link"  href="help">Help</a> 
            </div>
            </div>         
          )                  
    }
}