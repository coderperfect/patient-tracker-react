import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

class TreatmentsForPatientComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            patientrecord: null
        }
    }

    async componentDidMount(){
        Axios.get(`http://localhost:8081/patientrecord/patientrecord/${this.props.match.params.patientId}`)
            .then(res => {
                const data = res.data;
                this.setState({patientrecord : data});
            })
    }

    render(){
        return(
            <div className='container-fluid' style={{width:'50%'}}>
                <table className='table'>
                    <tbody>
                        {this.state.patientrecord.treatments.map(treatment => {
                            return(
                                <tr>
                                    <td><p>Treatment ID: <span>{treatment.treatmentId}</span></p></td>
                                    <td>
                                        {treatment.isNull("dietExcerciseDescription") ? 
                                        <span>Add Description</span> :
                                        <Link to={`dietexercise/${this.props.match.params.patientId}/${treatment.treatmentId}`}>Read the Description</Link>
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TreatmentsForPatientComponent;