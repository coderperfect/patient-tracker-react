import React from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';

const EditInPatient = (props) => {
    return (
        <div className="container-fluid">
            <Row>
                <Col sm={5}>
                    <h3>Edit In Patient Details</h3>
                </Col>

                <Col sm={2}>
                    <Button className="mt-3" onClick={props.backToDetails}>Back to Details</Button>
                </Col>

                <Col sm={5}>
                    <Button className="mt-3" onClick={props.backToList}>Back to List</Button>
                </Col>
            </Row>

            <Form className="container mt-5" onSubmit={props.handleEditSubmit}>
                <FormGroup row>
                    <Label for="patientName" sm={2}>Patient Name:</Label>
                    <Col sm={2}>
                        <Input type="text" id="patientName" name="patientName" disabled={true} value={props.inPatientDetails.patient.user.firstName + " " + props.inPatientDetails.patient.user.lastName} onChange={(event) => {props.handleChange(event)}}/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="roomNo" sm={2}>Room No:</Label>
                    <Col sm={2}>
                        <Input type="text" id="roomNo" name="roomNo" disabled={true} value={props.inPatientDetails.room.roomNo} onChange={(event) => {props.handleChange(event)}}/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="editAdmissionDate" sm={2}>Admission Date:</Label>
                    <Col sm={3}>
                        <Input type="date" id="editAdmissionDate" name="editAdmissionDate" placeholder="Admission Date" defaultValue={props.inPatientDetails.admissionDate} onChange={(event) => {props.handleChange(event)}}/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="editDischargeDate" sm={2}>Discharge Date:</Label>
                    <Col sm={3}>
                        <Input type="date" id="editDischargeDate" name="editDischargeDate" placeholder="Discharge Date" onChange={(event) => {props.handleChange(event)}}/>
                    </Col>
                </FormGroup>

                <FormGroup className="mt-5">
                        <Button type="submit">Save</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default EditInPatient;