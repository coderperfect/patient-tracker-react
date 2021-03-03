import React from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const UpdatePendingTestResult = (props) => {
    const testResultId = props.updateTestResultId;

    return (
        <div className="container-fluid">
            <Row>
                <Col sm={5}>
                    <h3>Update Test Result</h3>
                </Col>

                <Col sm={7}>
                    <Button className="btn btn-primary mt-3" onClick={props.handleBack}>Back to Test List</Button>
                </Col>
            </Row>

            <Form className="container mt-5" onSubmit={props.handleSubmit}>
                <FormGroup row>
                    <Label for="testResultId" sm={2}>Test Result Id:</Label>
                    <Col sm={2}>
                        <Input type="text" id="testResultId" name="testResultId" disabled={true} value={testResultId} onChange={(event) => {props.handleChange(event)}}/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="testResult" sm={2}>Test Result:</Label>
                    <Col sm={5}>
                        <Input type="textarea" id="testResult" name="testResult" placeholder="Enter Test Result" onChange={(event) => {props.handleChange(event)}}/>
                    </Col>
                </FormGroup>
                <Button type="submit">Save</Button>
            </Form>
        </div>
    );
}

export default UpdatePendingTestResult;