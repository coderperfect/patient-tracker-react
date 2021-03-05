import React, { Component } from 'react'
import { Table } from 'reactstrap';
import auth from "../authentication/auth";
import API from '../api/api';
import {Treatment, TreatmentList } from "../doctor/treatmentcomponent";
import { Alert } from 'reactstrap';
class TreatmentHistory extends Component {



    constructor(props) {
        super(props)

        this.state = {
            treatmentHistory: []
        }
    }

    componentDidMount() {
        let tList = []
        API.get(`treatment/history/${auth.getUserId()}`).then(
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
        if(this.state.treatmentHistory.length ===0)
            return <Alert color="danger">You have no Treatment History</Alert>
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
