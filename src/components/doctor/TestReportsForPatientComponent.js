import React, { Component } from 'react';
import API from '../api/api';
import {Link} from 'react-router-dom';

class TestReportsForPatientComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            testreports: [],
            loaded: false
        }
    }

    async componentDidMount(){
        API.get(`patientrecord/patientrecord/${this.props.match.params.patientId}`)
            .then(res => {
                const data = res.data;
                this.setState({testreports : data.testreports});
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
        if(this.state.testreports.length <= 0)
            return(
                <div className="container-fluid justify-content-center">
                    <span>No Test Report present</span>
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
                                    <td>{this.state.testreports[0].patient.patientId}</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>{this.state.testreports[0].patient.user.firstName + ' ' + this.state.testreports[0].patient.user.lastName}</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>{this.state.testreports[0].patient.user.gender}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='col-md-6 col-xs-12'>
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td>Date of Birth</td>
                                    <td>{this.state.testreports[0].patient.user.dateOfBirth}</td>
                                </tr>
                                <tr>
                                    <td>Blood Group</td>
                                    <td>{this.state.testreports[0].patient.bloodGroup}</td>
                                </tr>
                                <tr>
                                    <td>Contact Number</td>
                                    <td>{this.state.testreports[0].patient.user.contactNo}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-xs-12'>
                        <p style={{fontSize:'1.5rem'}}>Test Details</p>
                        <table className='table table-hover' style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>Test Report ID</th>
                                    <th>Test Name</th>
                                    <th>Test Result Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.testreports.map(report => {
                                    return(
                                        <tr key={report.testResultId}>
                                            <td>
                                                <Link to={{pathname:'/doctor/patientrecord/viewtest', aboutProps:{report: report}}}>{report.testResultId}</Link>
                                            </td>
                                            <td>{report.test.testName}</td>
                                            <td>{report.testResult ? 'Done' : 'Pending'}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default TestReportsForPatientComponent;