import React from 'react'
import { Table, Button } from 'reactstrap';
import base_url from '../api/bootapi';
import axios from "axios";
function RegistrationApproval(props) {

    console.log(props)
    function handleApproval(userId) {
        console.log(userId)
        axios.patch(`http://localhost:8081/user/approval/${userId}`).then(
            (response) => {
                alert("Request Approved")
                window.location.reload();
            }
        );
    }
    function handleDenial(userId) {
        console.log(userId)
        axios.patch(`http://localhost:8081/user/denial/${userId}`).then(
            (response) => {
                alert("Request Denied")
                window.location.reload();
            }
        );
    }
    return (
        <div className="container">
            <Table striped>

                <thead>
                    <tr>
                        <th>UserId</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.u.map((item) => <tr>
                        <th scope="row">{item.userId}</th>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td><Button color="primary" onClick={() => handleApproval(item.userId)}>Approve</Button>{' '}
                            <Button color="secondary" onClick={() => handleDenial(item.userId)}>Deny</Button>{' '}</td>
                    </tr>)}

                </tbody>
            </Table>

        </div>
    )
}

export default RegistrationApproval
