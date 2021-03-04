import React from 'react';
import { Alert, Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row} from 'reactstrap';

const AddInPatient = (props) => {
    return (
        <div className="container-fluid">
            <Row>
                <Col sm={5}>
                    <Alert color="info">Add In Patient</Alert>
                </Col>

                <Col sm={7}>
                    <Button color="info" className="mt-3" onClick={props.back}>Back To List</Button>
                </Col>
            </Row>

            <Form className="container mt-5" onSubmit={props.handleAddSubmit}>
                <FormGroup row>
                    <Label for="patientId" sm={2}>Patient Id:</Label>
                    <Col sm={2}>
                        
                        <Input invalid={props.addPatientIdInvalid} type="text" id="patientId" name="patientId" onChange={(event) => {props.handleChange(event)}}/>
                        <FormFeedback>Please provide Patient Id</FormFeedback>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="roomNo" sm={2}>Room No:</Label>
                    <Col sm={2}>
                        <Input invalid={props.addRoomNoInvalid} type="select" id="roomNo" name="roomNo" defaultValue="select" onChange={(event) => {props.handleChange(event)}}>
                            <option>select</option>
                            <option>21</option>
                            <option>22</option>
                        
                        </Input>
                        <FormFeedback>Please provide Room Number</FormFeedback>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="admissionDate" sm={2}>Admission Date:</Label>
                    <Col sm={3}>
                        <Input invalid={props.addAdmissionDateInvalid} type="date" id="admissionDate" name="admissionDate" placeholder="Enter Test Result" onChange={(event) => {props.handleChange(event)}}/>
                        <FormFeedback>Please provide Admission Date</FormFeedback>
                    </Col>
                </FormGroup>

                <FormGroup className="mt-5">
                        <Button color="info" type="submit">Create</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default AddInPatient;