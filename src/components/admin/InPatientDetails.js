import React from 'react';
import { Button, Col, Row, Table } from 'reactstrap';

const InPatientDetails = (props) => {
    const inPatientDetails = props.inPatientDetails;

    const renderDetailsTable = () => {
        return (
            <tbody>
                <tr key="patientId">
                    <th>Patient Id</th>
                    <td>{inPatientDetails.patient.patientId}</td>
                </tr>
                <tr key="First Name">
                    <th>First Name</th>
                    <td>{inPatientDetails.patient.user.firstName}</td>
                </tr>
                <tr key="Last Name">
                    <th>Last Name</th>
                    <td>{inPatientDetails.patient.user.lastName}</td>
                </tr>
                <tr key="Room Number">
                    <th>Room Number</th>
                    <td>{inPatientDetails.room.roomNo}</td>
                </tr>
                <tr key="Admission Date">
                    <th>Admission Date</th>
                    <td>{inPatientDetails.admissionDate}</td>
                </tr>
                <tr key="Discharge Date">
                    <th>Discharge Date</th>
                    <td>{inPatientDetails.dischargeDate === null ? "In Hospital" : inPatientDetails.dischargeDate}</td>
                </tr>
                <tr key="Gender">
                    <th>Gender</th>
                    <td>{inPatientDetails.patient.user.gender}</td>
                </tr>
            </tbody>
        );
    }

    return (
        <div className="container-fluid">
            <Row>
                <Col sm={9}>
                    <h3>In Patient Details</h3>
                </Col>

                <Col sm={1}>
                    <Button className="mt-3" onClick={props.edit}>Edit</Button>
                </Col>

                <Col sm={2}>
                    <Button className="mt-3" onClick={props.back}>Back To List</Button>
                </Col>
            </Row>

            <h4>{inPatientDetails.patient.patientName}</h4>

            <Table bordered className="container" style={{marginTop:'40px'}}>
                <thead>
                    <tr key="table-header">
                        <th scope="col">Field</th>
                        <th scope="col">Details</th>
                    </tr>
                </thead>
                {renderDetailsTable()}
            </Table>
        </div>
    );
}

export default InPatientDetails;