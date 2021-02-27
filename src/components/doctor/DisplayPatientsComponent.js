import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

class DisplayPatientsComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: 32,
            patients: []
        }
    }

    async componentDidMount() {
        Axios.get(`http://localhost:8081/patientrecord/patientids/${this.state.userId}`)
            .then(res => {
                const data = res.data;
                console.log(data);
                this.setState({patients : data});
            })
    }

    render(){
        if(this.state.patients.length === 0){
            return(
                <div className='container-fluid'>
                    <h2>There are no patients present</h2>
                </div>
            );
        }
        return(
            <div className="container-fluid m-auto" style={{width:'50%'}}>
                <table className="table">
                    <thead>
                        <th>Patient Id</th>
                        <th>Patient Name</th>
                    </thead>
                    <tbody>
                        {this.state.patients.map(patient => {
                            return(
                                <tr>
                                    <td>
                                        <Link to={`/dietexercise/${patient.patientId}`}>
                                            {patient.patientId}
                                        </Link>
                                    </td>
                                    <td>{patient.user.firstName + patient.user.lastName}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DisplayPatientsComponent;