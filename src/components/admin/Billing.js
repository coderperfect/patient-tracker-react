import API from '../api/api';
import React, {Component} from 'react';
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Row, Table, UncontrolledButtonDropdown } from 'reactstrap';
import PrescriptionBilling from './PrescriptionBilling';

class Billing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patientId: null,
            billing: null,
            showPrescriptionPopUp: false,
            showConsultationPopUp: false,
            showStayPopUp: false,
            showLabPopUp: false,
            showNursingPopUp: false,
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        switch(name) {
            case "patientId":
                this.setState({
                    patientId: value
                });
                break;
            default:
                break;
        }
    }

    handleComponentClick = (event) => {
        const { id } = event.target;

        switch(id) {
            case "prescription":
                this.setState({
                    showPrescriptionPopUp: true
                });
                break;
            case "consultation":
                this.setState({
                    showConsultationPopUp: true
                });
                break;
            case "stay":
                this.setState({
                    showStayPopUp: true
                });
                break;
            case "lab":
                this.setState({
                    showLabPopUp: true
                });
                break;
            case "nursing":
                this.setState({
                    showNursingPopUp: true
                });
                break;
            default:
                break;
        }
    }

    togglePrescriptionPopUp = () => {
        this.setState({
            showPrescriptionPopUp: !this.state.showPrescriptionPopUp
        })
    }

    async handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await API.get(
                `billing/${this.state.patientId}`
            );

            this.setState({
                billing: response.data
            })
        }
        catch(error) {
            alert(error);
        }
    }

    renderDetailsTable = () => {
        if(this.state.billing === null)
            return null;

        const content = (
            <tbody>
                <tr key="patientId:">
                    <th>Patient Id:</th>
                    <td>{this.state.billing.patient.user.patientId}</td>
                </tr>
                <tr key="First Name:">
                    <th>First Name:</th>
                    <td>{this.state.billing.patient.user.firstName}</td>
                </tr>
                <tr key="Last Name:">
                    <th>Last Name:</th>
                    <td>{this.state.billing.patient.user.lastName}</td>
                </tr>
                <tr key="Date Of Birth:">
                    <th>Date Of Birth:</th>
                    <td>{this.state.billing.patient.user.dateOfBirth}</td>
                </tr>
                <tr key="Gender">
                    <th>Gender</th>
                    <td>{this.state.billing.patient.user.gender}</td>
                </tr>
                <tr key="Contact Number:">
                    <th>Contact Number:</th>
                    <td>{this.state.billing.patient.user.contactNo}</td>
                </tr>
                <tr key="Cause of Visit:">
                    <th>Blood Group:</th>
                    <td>{this.state.billing.patient.bloodGroup}</td>
                </tr>
            </tbody>
        );

        return content;
    }

    renderBillingTable = () => {
        return (
            <tbody>
                <tr key="patientId:">
                    <td>1</td>
                    <td>{"Prescription"}</td>
                    <td>{"15000.00"}</td>
                </tr>
                <tr key="First Name:">
                    <td>2</td>
                    <td>{"Consultation"}</td>
                    <td>{"80000.00"}</td>
                </tr>
                <tr key="Last Name:">
                    <td>3</td>
                    <td>{"Stay"}</td>
                    <td>{"100000.00"}</td>
                </tr>
                <tr key="Date Of Birth:">
                    <td>4</td>
                    <td>{"Nursing Charges"}</td>
                    <td>{"500000.00"}</td>
                </tr>
                <tr key="Gender">
                    <td>5</td>
                    <td>{"Lab Charges"}</td>
                    <td>{"300000.00"}</td>
                </tr>
                <tr key="Contact Number:">
                    <th></th>
                    <td>{"Total"}</td>
                    <td>{"995000.00"}</td>
                </tr>
            </tbody>
        );
    }

    render() {
        return (
            <div className="container-fluid">
                <h2>Billing</h2>

                <Row>
                    <Col sm="4">
                        <Form inline className="container mt-5" onSubmit={this.handleSubmit.bind(this)}>
                            <FormGroup>
                                <Label for="patientId" className="mb-2 mr-sm-2 mb-sm-0">Patient Id:</Label>
                                <Input type="text" id="patientId" name="patientId" className="mb-2 mr-sm-2 mb-sm-0" onChange={(event) => {this.handleChange(event)}}/>
                            </FormGroup>
                            <Button type="submit">Load</Button>
                        </Form>
                    </Col>

                    <Col sm="4">
                    <UncontrolledButtonDropdown className="mt-5">
                        <DropdownToggle caret>
                            Add Components
                        </DropdownToggle>
                        
                        <DropdownMenu>
                            <DropdownItem id="prescription" onClick={this.handleComponentClick.bind(this)}>Prescriptions</DropdownItem>
                            <DropdownItem id="consultation">Consultation</DropdownItem>
                            <DropdownItem id="stay">Stay</DropdownItem>
                            <DropdownItem id="lab">Lab Charges</DropdownItem>
                            <DropdownItem id="nursing">Nursing Charges</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    </Col>
                </Row>

                <hr/>

                <h4>Patient Details</h4>

                <Table borderless size="sm" className="container" style={{marginTop:'40px'}}>
                    {this.renderDetailsTable()}
                </Table>

                <hr/>

                <h4>Bill</h4>

                <Table bordered size="sm" className="container" style={{marginTop:'40px'}}>
                    <thead>
                        <tr key="table-header">
                            <th scope="col">Serial Number</th>
                            <th scope="col">Component</th>
                            <th scope="col">Cost (Rs.)</th>
                        </tr>
                    </thead>
                    {this.renderBillingTable()}
                </Table>

                <hr/>

                <Button className="mb-5">Generate Bill</Button>

                <PrescriptionBilling modal={this.state.showPrescriptionPopUp} toggle={this.togglePrescriptionPopUp}/>
            </div>
        );
    }
}

export default Billing;