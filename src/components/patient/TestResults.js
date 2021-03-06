import React, { Component } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';
import auth from "../authentication/auth";
import { Alert } from 'reactstrap';
import LoadingComponent from '../LoadingComponent';
class TestResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testreports: [],
            loaded: false,
            request:"request"
        } 
    }

    handleRequest = (event) => {
        API.put("testreport/requested/"+event.target.id)
        .then(res => {
            alert(res.data);
        })
    }

    async componentDidMount() {
        await API.get(`patient/patientrecord/${auth.getUserId()}`)
            .then(res => {
                const data = res.data;
                this.setState({ testreports: data.testreports });
                this.setState({ loaded: true });
                console.log(res)
            })
            .catch(error => {
                alert(error);
            })
    }

    render() {
    
        if (!this.state.loaded) {
            return (
                <LoadingComponent/>
            );
        }
        else if (this.state.testreports.length === 0) {
            return (
               
                    <Alert color="danger">No Test Report present</Alert>
            );
        }
           
        else {
        return (
            <div className='container-fluid'>
                <p className='justify-content-center' style={{ fontSize: '1.5rem' }}>Patient Details</p>
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
                        <p style={{ fontSize: '1.5rem' }}>Test Details</p>
                        <table className='table table-hover' style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Test Report ID</th>
                                    <th>Test Name</th>
                                    <th>Test Result Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.testreports.map(report => {
                                    return (
                                        <tr key={report.testResultId}>
                                            <td>
                                                <Link to={{ pathname: '/patient/test-details-for-patient', aboutProps: { report: report } }}>{report.testResultId}</Link>
                                            </td>
                                            <td>{report.test.testName}</td>
                                            <td>{report.testResult ? 'Done' : 'Pending'}</td>
                                            {/* <td><button style={{width:"100px", height:"20px"}} id={report.testResultId} onClick={this.handleRequest}>{report.testResult ? '' : this.request}</button></td> */}
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
}

export default TestResults;