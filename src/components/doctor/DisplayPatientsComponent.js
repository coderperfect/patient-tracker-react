import React, {Component} from 'react';
import API from '../api/api';
import {Link} from 'react-router-dom';
import auth from '../authentication/auth';
import LoadingComponent from '../LoadingComponent';
import {Alert} from "reactstrap";
class DisplayPatientsComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: auth.getDoctorId(),
            patients: [],
            loaded: false
        }
    }

    async componentDidMount() {
        API.get(`patientrecord/patientids/${this.state.userId}`)
            .then(res => {
                const data = res.data;
                this.setState({patients : data});
                this.setState({loaded: true});
            })
    }

    render(){
        if(!this.state.loaded)
            return(
               <LoadingComponent/>
            );
        if(this.state.patients.length === 0){
            return(
               
                    <Alert color="danger">There are no patients present</Alert>
            )     
        }
        return(
            <div className="container-fluid m-auto">
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-sm-12'>
                        <Alert color="info"><p style={{fontSize:'1.5rem'}}>List of Patients</p></Alert>
                        <table className="table table-hover">
                            <thead>
                                <th>Patient Id</th>
                                <th>Patient Name</th>
                            </thead>
                            <tbody>
                                {this.state.patients.map(patient => {
                                    return(
                                        <tr key={patient.patientId}>
                                            <td>
                                                <Link to={`${this.props.from}/${patient.patientId}`}>
                                                    {patient.patientId}
                                                </Link>
                                            </td>
                                            <td>{patient.user.firstName + ' ' + patient.user.lastName}</td>
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

export default DisplayPatientsComponent;