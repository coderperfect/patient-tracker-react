import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

class DisplayPatientsComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: 32,
            patients: [],
            loaded: false
        }
    }

    async componentDidMount() {
        Axios.get(`http://localhost:8081/patientrecord/patientids/${this.state.userId}`)
            .then(res => {
                const data = res.data;
                this.setState({patients : data});
                this.setState({loaded: true});
            })
    }

    render(){
        if(!this.state.loaded)
            return(
                <div className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
        if(this.state.patients.length === 0){
            return(
                <div className='container-fluid'>
                    <h2>There are no patients present</h2>
                </div>
            );
        }
        return(
            <div className="container-fluid m-auto">
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-sm-12'>
                        <p style={{fontSize:'1.5rem'}}>List of Patients</p>
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
                                                <Link to={`/${this.props.from}/${patient.patientId}`}>
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