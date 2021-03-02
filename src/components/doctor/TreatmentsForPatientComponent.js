import React, {Component} from 'react';
import API from '../api/api';
import {Link} from 'react-router-dom';
import ViewDietDescription from './ViewDietDescription';

class TreatmentsForPatientComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            patientrecord: {},
            loaded: false
        }
    }

    async componentDidMount(){
        API.get(`patientrecord/patientrecord/${this.props.match.params.patientId}`)
            .then(res => {
                const data = res.data;
                console.log(data);
                this.setState({patientrecord : data});
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
        if(this.state.patientrecord.treatments.length <= 0)
            return(
                <div className="container-fluid justify-content-center">
                    <span>No Treatments present</span>
                </div>
            );
        return(
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-md-6 col-sm-12'>
                        <p style={{fontSize:'1.5rem'}}>Treatments</p>
                        <table className='table table-hover'>
                            <tbody>
                                {this.state.patientrecord.treatments.map(treatment => {
                                    return(
                                        <tr key={treatment.treatmentId}>
                                            <td><p>Treatment ID: <span>{treatment.treatmentId}</span></p></td>
                                            <td>
                                                {treatment.dietExcerciseDescription ? 
                                                <Link to={{pathname:'/doctor/patientrecord/viewdiet', aboutProps:{treatment: treatment,fromAdd: false}}}>Read the Diet Description</Link>
                                                :<span>No Diet description Available <Link to={{pathname:'/doctor/patientrecord/viewdiet', aboutProps:{treatment: treatment,fromAdd: true}}}>Add Diet Description</Link></span>
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

export default TreatmentsForPatientComponent;