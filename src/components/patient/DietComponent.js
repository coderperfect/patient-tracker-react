import React, { Component } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';
import auth from "../authentication/auth";
import LoadingComponent from '../LoadingComponent';
import { Alert } from 'reactstrap';

class DietComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientrecord: {},
            loaded: false,
            show: false
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    async componentDidMount() {
       
        API.get(`patient/patientrecord/${auth.getUserId()}`)
            .then(res => {
                const data = res.data;
                this.setState({ patientrecord: data });
                this.setState({ loaded: true });
            })
            .catch(error => {
                alert(error);
            })
    }

    render() {
        if (!this.state.loaded)
            return (
               <LoadingComponent />
            );
        if (this.state.patientrecord.treatments.length <= 0)
            return (
                <div className="container-fluid justify-content-center">
                    <Alert color="danger">No Diets or Exercises are Present</Alert>
                </div>
            );
        return (
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-md-6 col-sm-12'>
                        <p style={{ fontSize: '1.5rem' }}>Diets And Exercises</p>
                        <table className='table table-hover'>
                            <tbody>
                                {this.state.patientrecord.treatments.map(treatment => {
                                    return (
                                        <tr key={treatment.treatmentId}>
                                            <td><p>Treatment ID: <span>{treatment.treatmentId}</span></p></td>
                                            <td>
                                                {treatment.dietExcerciseDescription ?
                                                    <Link to={{ pathname: '/patient/view-diet-details', aboutProps: { treatment: treatment } }}>Read Diet & Exercise Description</Link>
                                                    : <span>No Diet or Exercise Available </span>
                                                }

                                            </td>
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

export default DietComponent;