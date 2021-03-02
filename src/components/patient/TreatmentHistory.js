import React, { Component } from 'react'
import { Table } from 'reactstrap';
import API from '../api/api';
import {Treatment, TreatmentList } from "../doctor/treatmentcomponent";
class TreatmentHistory extends Component {



    constructor(props) {
        super(props)

        this.state = {
            treatmentHistory: []
        }
    }

    componentDidMount() {
        let tList = []
        let patientId = 31;
        API.get(`treatment/history/${patientId}`).then(
            (response) => {
                response.data.map(
                    (treat) => {
                        tList.push(treat)
                    }
                )

                this.setState({ treatmentHistory: tList });
            },
            (error) => {
                alert("Error")
            }
        );

    };

    render() {
        return (
            <div className="row">
                <div className="container col col-md-2"></div>
                <div className="container col col-md-8">
                    
                            {
                            this.state.treatmentHistory.map((item) => {
                                return <Treatment treatment={item} visible="collapse" />
                            })
                            }                 
                                
                </div>
                <div className="container col col-md-2"></div>
            </div>
        )
    }
}

export default TreatmentHistory
