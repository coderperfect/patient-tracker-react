import axios from 'axios';
import React, {Component} from 'react';
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Row, Table, UncontrolledButtonDropdown } from 'reactstrap';
import ConsultationBilling from './ConsultationBilling';
import LabBilling from './LabBilling';
import NursingBilling from './NursingBilling';
import PrescriptionBilling from './PrescriptionBilling';
import StayBilling from './StayBilling';

class Billing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patientId: null,
            billing: null,
            showPrescriptionPopUp: false,
            showConsultationsPopUp: false,
            showStayPopUp: false,
            showLabsPopUp: false,
            showNursingPopUp: false,
            prescription: null,
            consultations: null,
            stay: null,
            nursing: null,
            labs: null,
            inPatientRecord: null,
            billingTotal: 0,
            prescriptionsResponse: null,
            consultationsRespose: null,
            stayRespose: null,
            labsRespose: null,
            nursingRespose: null
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
            case "consultations":
                this.setState({
                    showConsultationsPopUp: true
                });
                break;
            case "stay":
                this.setState({
                    showStayPopUp: true
                });
                break;
            case "labs":
                this.setState({
                    showLabsPopUp: true
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

    setPrescription = (prescription) => {
        this.setState({
            prescription: prescription
        });
    }

    togglePrescriptionPopUp = () => {
        this.setState({
            showPrescriptionPopUp: !this.state.showPrescriptionPopUp
        })
    }

    setConsultations = (consultations) => {
        this.setState({
            consultations: consultations
        });
    }

    toggleConsultationsPopUp = () => {
        this.setState({
            showConsultationsPopUp: !this.state.showConsultationsPopUp
        })
    }

    setStay = (stay) => {
        this.setState({
            stay: stay
        });
    }

    toggleStayPopUp = () => {
        this.setState({
            showStayPopUp: !this.state.showStayPopUp
        })
    }

    setNursing = (nursing) => {
        this.setState({
            nursing: nursing
        });
    }

    toggleNursingPopUp = () => {
        this.setState({
            showNursingPopUp: !this.state.showNursingPopUp
        })
    }

    setLabs = (labs) => {
        this.setState({
            labs: labs
        });
    }

    toggleLabsPopUp = () => {
        this.setState({
            showLabsPopUp: !this.state.showLabsPopUp
        })
    }

    async handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.get(
                `http://localhost:8081/billing/${this.state.patientId}`
            );

            this.setState({
                billing: response.data
            })
        }
        catch(error) {
            alert(error);
        }
    }

    async handlePrescriptionsClick() {
        try {
            const response = await axios.get(
                `http://localhost:8081/billing/${this.state.patientId}`
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
        let billPrescription = null;
        let billConsultation = null;
        let billStay = null;
        let billNursingCharges = null;
        let billLabCharges = null;
        let billTotal = 0;
        let serialNumber = 0;

        if(this.state.prescription !== null) {
            billTotal += 1000.00;
            serialNumber++;
            billPrescription = (
                <tr key="billPrescription">
                    <td>{serialNumber}</td>
                    <td>{"Prescription"}</td>
                    <td>{"15000.00"}</td>
                </tr>
            );
        }
        else
            billPrescription = null;

        if(this.state.consultations !== null) {
            billTotal += 1000.00;
            serialNumber++;
            billConsultation = (
                <tr key="billConsultation">
                    <td>{serialNumber}</td>
                    <td>{"Consultation"}</td>
                    <td>{"80000.00"}</td>
                </tr>
            );
        }
        else
            billConsultation = null;

        if(this.state.stay !== null) {
            billTotal += 1000.00;
            serialNumber++;
            billStay = (
                <tr key="billStay">
                    <td>{serialNumber}</td>
                    <td>{"Stay"}</td>
                    <td>{"100000.00"}</td>
                </tr>
            );
        }
        else
            billStay = null;

        if(this.state.nursing !== null) {
            billTotal += 1000.00;
            serialNumber++;
            billNursingCharges = (
                <tr key="billNursingCharges">
                    <td>{serialNumber}</td>
                    <td>{"Nursing Charges"}</td>
                    <td>{"500000.00"}</td>
                </tr>
            );
        }
        else
            billNursingCharges = null;

        if(this.state.labs !== null) {
            billTotal += 1000.00;
            serialNumber++;
            billLabCharges = (
                <tr key="billLabCharges">
                    <td>{serialNumber}</td>
                    <td>{"Lab Charges"}</td>
                    <td>{"300000.00"}</td>
                </tr>
            );
        }
        else
            billLabCharges = null;

        if(billTotal !== 0) {
            billTotal = (
                <tr key="billTotal">
                    <th></th>
                    <td>{"Total"}</td>
                    <td>{billTotal}</td>
                </tr>
            );
        }
        else
            billTotal = null;

        return (
            <tbody>
                {billPrescription}
                {billConsultation}
                {billStay}
                {billNursingCharges}
                {billLabCharges}
                {billTotal}
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
                            <DropdownItem id="consultations" onClick={this.handleComponentClick.bind(this)}>Consultation</DropdownItem>
                            <DropdownItem id="stay" onClick={this.handleComponentClick.bind(this)}>Stay</DropdownItem>
                            <DropdownItem id="labs" onClick={this.handleComponentClick.bind(this)}>Lab Charges</DropdownItem>
                            <DropdownItem id="nursing" onClick={this.handleComponentClick.bind(this)}>Nursing Charges</DropdownItem>
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

                <PrescriptionBilling modal={this.state.showPrescriptionPopUp} toggle={this.togglePrescriptionPopUp} prescription={this.state.prescription} setPrescription={this.setPrescription.bind(this)}/>
                <ConsultationBilling modal={this.state.showConsultationsPopUp} toggle={this.toggleConsultationsPopUp} consultations={this.state.consultations} setConsultations={this.setConsultations.bind(this)} consultationsRespose={this.state.consultationsRespose}/>
                <StayBilling modal={this.state.showStayPopUp} toggle={this.toggleStayPopUp} stay={this.state.stay} setStay={this.setStay.bind(this)} stayRespose={this.state.consultationsRespose}/>
                <LabBilling modal={this.state.showLabsPopUp} toggle={this.toggleLabsPopUp} labs={this.state.labs} setLabs={this.setLabs.bind(this)} labsRespose={this.state.labsRespose}/>
                <NursingBilling modal={this.state.showNursingPopUp} toggle={this.toggleNursingPopUp} nursing={this.state.nursing} setNursing={this.setNursing.bind(this)} nursingRespose={this.state.nursingRespose}/>
            </div>
        );
    }
}

export default Billing;