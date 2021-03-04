import React, { Component } from 'react'
import API from '../api/api'
import LoadingComponent from '../LoadingComponent'
import PatientDetails from './PatientDetails'
class PatientList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            patientList: []
        }
    }

    componentDidMount() {
        let pList = []
        API.get("patient/getallpatients").then(
            (response) => {
                response.data.map(
                    (patient) => {
                        pList.push(patient)
                    }
                )

                this.setState({ patientList: pList });
            },
            (error) => {
                alert("Error")
            }
        );

    };

    render() {
        return (
            <div>

                {
                    this.state.patientList.length > 0 ? <PatientDetails u={this.state.patientList} />
                        : <LoadingComponent/>
                }
            </div>
        )
    }
}

export default PatientList


