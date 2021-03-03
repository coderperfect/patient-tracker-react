import React, { useState } from 'react'
import { Table, Button, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, buttonLabel } from 'reactstrap';
import axios from "axios";
import { Link } from 'react-router-dom';
import EditPatient from './EditPatient'
function PatientDetails(props) {


    function handleClick(patientId) {
        axios.get(`http://localhost:8081/patient/details/${patientId}`).then(
            (response) => {

                setdetails(response.data)
                toggle()
            }
        );
    }
    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);
    const [details, setdetails] = useState(false);

    const toggle = () => setModal(!modal);


    return (
        <div className="container">
            <Button outline color="primary" className="mt-3" style={{ color: 'primary', marginLeft: '1000px' }}>Add Patient</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Patient Details</ModalHeader>
                <ModalBody>
                    <p>{`Patient Id :${details === false ? null : details.patientId}`}</p>
                    <p>{` Name: ${details === false ? null : details.user.firstName} ${details === false ? null : details.user.lastName}`}</p>
                    <p>{`Contact No. : ${details === false ? null : details.user.contactNo}`}</p>
                    <p>{`Gender : ${details === false ? null : details.user.gender}`}</p>
                    <p>{`Date Of Birth :${details === false ? null : details.user.dateOfBirth}`}</p>
                    <p>{`Address: ${details === false ? null : details.user.address}`}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Close</Button>{' '}
                </ModalFooter>
            </Modal>
            <h3>List Of Patients</h3>
            <Table striped>

                <thead>
                    <tr>
                        <th>Patient Id</th>
                        <th>Name</th>
                        <th></th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {props.u.map((item) => <tr>
                        <td scope="row">{item.patientId}</td>
                        <td>{item.user.firstName}  {item.user.lastName}</td>
                        <td><Link to={{ pathname: '/edit-patient', aboutProps: { edit: item } }}>Edit Details</Link>{' '}</td>
                            <td><Button color="primary" onClick={() => handleClick(item.patientId)} >View Details</Button></td>
                        
                    </tr>)}

                </tbody>
            </Table>
        </div>
    )
}

export default PatientDetails
