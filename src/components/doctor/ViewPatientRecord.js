import React, { Component } from 'react';
import API from '../api/api';
import {Link} from 'react-router-dom';
import { Button } from 'bootstrap';
import {Alert} from "reactstrap";
import auth from "../authentication/auth";
import LoadingComponent from '../LoadingComponent';
class ViewPatientRecord extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            patient: {}
        }
    }

    async componentDidMount(){
        API.get(`patientrecord/patientrecord/${this.props.match.params.patientId}`)
            .then(res => {
                const data = res.data;
                localStorage.setItem("recordId",data.recordId);
                this.setState({patient : data.patient});
                this.setState({loaded: true});
            })
            .catch(error => {
                alert(error);
            })
    }

    handleSelect = (event) => {
        console.log(event.target.value)
        this.props.history.push(event.target.value);
    }

    render(){
        if(!this.state.loaded)
            return(
                <LoadingComponent/>
            );
        return(
            <div className='container-fluid'>
                <Alert color="info"><b>Patient Details</b></Alert>
                <div className='row'>
                    <div className='col-md-6 col-xs-12'>
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td>Patient ID</td>
                                    <td>{this.state.patient.patientId}</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>{this.state.patient.user.firstName + ' ' + this.state.patient.user.lastName}</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>{this.state.patient.user.gender}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='col-md-6 col-xs-12'>
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td>Date of Birth</td>
                                    <td>{this.state.patient.user.dateOfBirth}</td>
                                </tr>
                                <tr>
                                    <td>Blood Group</td>
                                    <td>{this.state.patient.bloodGroup}</td>
                                </tr>
                                <tr>
                                    <td>Contact Number</td>
                                    <td>{this.state.patient.user.contactNo}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <form>
                    <div className='row mt-5'>
                        <div className='col-md-4 col-xs-12'>
                            {/* <label className='form-label mr-2'>Treatments</label> */}
                            <select class="form-select form-control" style={{width:"300px"}}  onChange={this.handleSelect}>
                                <option disabled='disabled' selected='selected'>Select an action for Treatments</option>
                                <option value="/doctor/patientrecord/treatments">View Treatments</option>
                                <option value="/doctor/patientrecord/addtreatment">Add Treatment</option>
                            </select>
                        </div>
                        <div className='col-md-4 col-xs-12'>
                            {/* <label className='form-label mr-2'>Prescriptions</label> */}
                            <select class="form-select form-control" style={{width:"300px"}}  onChange={this.handleSelect}>
                                <option disabled='disabled' selected='selected'>Select an action for Prescriptions</option>
                                <option value="/doctor/patientrecord/prescriptions">View Prescriptions</option>
                                <option value="/doctor/patientrecord/addprescription">Add Prescriptions</option>
                            </select>
                        </div>
                        <div className='col-md-4 col-xs-12'>
                            {/* <label className='form-label mr-2'>Test Reports</label> */}
                            <select class="form-select form-control" style={{width:"300px"}}  onChange={this.handleSelect}>
                                <option disabled='disabled' selected='selected'>Select an action for Test Reports</option>
                                <option value={`/doctor/patientrecord/viewtestresults/${auth.getRecordId()}`}>View Test Reports</option>
                                <option value="/doctor/patientrecord/addtestreport">Add Test Reports</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default ViewPatientRecord;