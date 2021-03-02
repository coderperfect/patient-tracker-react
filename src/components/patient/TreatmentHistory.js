import React, { Component } from 'react'
import { Table } from 'reactstrap';
import API from '../api/api'
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
        API.get(`/treatment/history/${patientId}`).then(
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
            <div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Treatment Id</th>
                            <th>Treatment Description</th>
                            <th>Treatment Cost</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.treatmentHistory.map((item) =>
                            <tr>
                                <th scope="row">{item.treatmentId}</th>
                                <td>{item.treatmentDescription}</td>
                                <td>{item.treatmentCost}</td>
                            </tr>)}

                    </tbody>
                </Table>
            </div>
        )
    }
}

export default TreatmentHistory
