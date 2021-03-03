import React, { Component } from 'react'
import API from '../api/api'
import RegistrationApproval from './RegistrationApproval'
class RegistrationApprovalList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            approvalList: []
        }
    }

    componentDidMount() {
        let appList = []
        API.get("/user").then(
            (response) => {
                response.data.map(
                    (user) => {
                        appList.push(user)
                    }
                )
                this.setState({ approvalList: appList });
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
                    this.state.approvalList.length > 0 ? <RegistrationApproval u={this.state.approvalList} />
                        : "No Users for pending Approval"
                }
            </div>
        )
    }
}

export default RegistrationApprovalList


