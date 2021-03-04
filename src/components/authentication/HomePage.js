import React, { Component } from 'react';
// import logo from './PatientTrackerimage.png'
import 'bootstrap/dist/js/bootstrap.js';
import "./StyleSheet.css"
export default class HomeComponent extends Component{
    constructor(props) {
        super(props);
        localStorage.setItem("role","");
        localStorage.setItem("token","");
        localStorage.setItem("userId","");
        localStorage.setItem("recordId","");
        this.state={
        role:""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {               
        this.setState({ role: e.target.value });                
      }

        render() {
            localStorage.setItem("role",this.state.role);
        return (
            <div className="App row" >
                <div className="col-sm-8"> <img src="http://localhost:3000/landing.jpg.png"  height="70%"></img> </div>
                <div className="col-sm-4"> 

                <form className="row" style={{display:"flex",paddingTop:"70px"}}>
                
                 <select className="form-control col col-sm-12"  value={this.state.role} onChange={this.handleChange}>
                            <option className="hidden" value="DEFAULT">
                                Select your Role</option>
                                    <option value="ROLE_ADMIN">Admin</option>
                                    <option value="ROLE_CLERK">Clerk</option>
                                    <option value="ROLE_PATIENT">Patient</option>
                                    <option value="ROLE_DOCTOR">Doctor</option>
                      </select>  
                       

                      <div className="col col-sm-12" style={{display:"flex", justifyContent:"space-around"}}>                         
                        <button type="button" className="btn btn-info" style={{marginTop:"20px", width:"100px"}}
                            onClick={event =>  window.location.href='/login' }>
                                Login</button> 
                   
                    <button type="button" className="btn btn-info" style={{marginTop:"20px", width:"100px"}}
                                onClick={event =>  window.location.href='/registration'}>
                                    Register</button>
                        </div>
                                         
            </form>                           
            </div> 
            </div>
        );
    }
}