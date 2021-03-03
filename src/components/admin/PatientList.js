import React, { Component } from 'react'
import axios from "axios";
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
        axios.get("http://localhost:8081/patient").then(
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
                        : "No Patients as of now"
                }
            </div>
        )
    }
}

export default PatientList


