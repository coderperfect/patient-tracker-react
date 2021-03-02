import React, { Component } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

class ViewPatientRecord extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            patient: {}
        }
    }

    async componentDidMount(){
        Axios.get(`http://localhost:8081/patientrecord/patientrecord/${this.props.match.params.patientId}`)
            .then(res => {
                const data = res.data;
                this.setState({patient : data.patient});
                this.setState({loaded: true});
            })
            .catch(error => {
                alert(error);
            })
    }

    render(){
        if(!this.state.loaded)
            return(
                <div className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
        return(
            <div className='container-fluid'>
                <p className='justify-content-center' style={{fontSize:'1.5rem'}}>Patient Details</p>
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
                            <label className='form-label mr-2'>Treatments</label>
                            <select class="form-select">
                                <option disabled='disabled' selected='selected'>Select an action for Treatments</option>
                                <option>View Treatments</option>
                                <option>Add Treatment</option>
                            </select>
                        </div>
                        <div className='col-md-4 col-xs-12'>
                            <label className='form-label mr-2'>Prescriptions</label>
                            <select class="form-select">
                                <option disabled='disabled' selected='selected'>Select an action for Prescriptions</option>
                                <option>View Prescriptions</option>
                                <option>Add Prescriptions</option>
                            </select>
                        </div>
                        <div className='col-md-4 col-xs-12'>
                            <label className='form-label mr-2'>Test Reports</label>
                            <select class="form-select">
                                <option disabled='disabled' selected='selected'>Select an action for Test Reports</option>
                                <option>View Test Reports</option>
                                <option>Add Test Reports</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default ViewPatientRecord;