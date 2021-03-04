import API from '../api/api';
import React, {Component} from 'react';
import { Alert, Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Row, Table, UncontrolledButtonDropdown } from 'reactstrap';
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
            stayTotal: null,
            nursing: null,
            nursingTotal: null,
            labs: null,
            labsTotal: null,
            inPatientRecord: null,
            billingTotal: 0,
            prescriptionsResponse: null,
            consultationsResponse: null,
            stayResponse: null,
            labsResponse: null,
            nursingResponse: null
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

    async handleGenerateBill() {
        // alert("clicked")
          let billing = {...this.state.billing};
        let inPatientRecord = {...this.state.inPatientRecord};
        
        if(this.state.prescription !== null) {
            let prescription = {...this.state.prescription};
            prescription.billed = true;
            billing.prescription = {...prescription};
        }

        if(this.state.consultations !== null) {
            let consultations = [...this.state.consultations];
            billing.consultations = [...consultations];
        }

        if(this.state.labs !== null) {
            let testReports = [...this.state.labs];
            testReports.forEach(testReport => {
                testReport.billed = true;
            });

            billing.testReports = [...testReports];
        }

        if(this.state.stay !== null) {
            inPatientRecord.roomChargesBilled = true;
        }

        if(this.state.nursing !== null) {
            inPatientRecord.nursingChargesBilled = true;
        }

        if(this.state.stay !== null || this.state.nursing !== null)
            billing.inPatientRecord = {...inPatientRecord}


        try {
            let response = await API.post(
                `billing/${this.state.patientId}/${localStorage.getItem("userId")}`,
                billing
            );

            if(response.data) {
                alert("Billed");
            }

            this.setState({
                showPrescriptionPopUp: false,
                showConsultationsPopUp: false,
                showStayPopUp: false,
                showLabsPopUp: false,
                showNursingPopUp: false,
                prescription: null,
                consultations: null,
                stay: null,
                stayTotal: null,
                nursing: null,
                nursingTotal: null,
                labs: null,
                labsTotal: null,
                inPatientRecord: null,
                billingTotal: 0,
                prescriptionsResponse: null,
                consultationsResponse: null,
                stayResponse: null,
                labsResponse: null,
                nursingResponse: null
            })

            this.handleRefreshAfterBilling();
        }
        catch(error) {
            alert(error);
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

    setStay = (stay, stayTotal) => {
        this.setState({
            stay: stay,
            stayTotal: stayTotal
        });
    }

    toggleStayPopUp = () => {
        this.setState({
            showStayPopUp: !this.state.showStayPopUp
        })
    }

    setNursing = (nursing, nursingTotal) => {
        this.setState({
            nursing: nursing,
            nursingTotal: nursingTotal
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

    setLabsTotal = (labsTotal) => {
        this.setState({
            labsTotal: labsTotal
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
            const response = await API.get(
                `billing/${this.state.patientId}`
            );

            this.setState({
                billing: response.data
            })

            this.getInPatientRecord();

            if(this.state.inPatientRecord) {
                this.setState({
                    stayRespose: this.state.inPatientRecord.room
                });

                this.setState({
                    nursingRespose: this.state.inPatientRecord.room
                });
            }
        }
        catch(error) {
            alert(error);
        }

        this.getPrescriptions();
        this.getConsultations();
        this.getLabs();
    }

    async handleRefreshAfterBilling() {
        try {
            const response = await API.get(
                `billing/${this.state.patientId}`
            );

            this.setState({
                billing: response.data
            })

            this.getInPatientRecord();

            if(this.state.inPatientRecord) {
                this.setState({
                    stayRespose: this.state.inPatientRecord.room
                });

                this.setState({
                    nursingRespose: this.state.inPatientRecord.room
                });
            }
        }
        catch(error) {
            alert(error);
        }

        this.getPrescriptions();
        this.getConsultations();
        this.getLabs();
    }

    async getPrescriptions() {
        try {
            let response = await API.get(
                `billing/prescription/${this.state.patientId}`
            );

            this.setState({
                prescriptionsResponse: response.data
            })
        }
        catch(error) {
            alert(error);
        }
    }

    async getConsultations() {
        try {
            let response = await API.get(
                `billing/consultation/${this.state.patientId}`
            );

            this.setState({
                consultationsResponse: response.data
            })
        }
        catch(error) {
            alert(error);
        }
    }

    async getLabs() {
        try {
            let response = await API.get(
                `billing/testreport/${this.state.patientId}`
            );

            this.setState({
                labsResponse: response.data
            })
        }
        catch(error) {
            alert(error);
        }
    }

    async getInPatientRecord() {
        try {
            let response = await API.get(
                `billing/inpatientrecord/${this.state.patientId}`
            );

            let stayResponse = null;
            let nursingResponse = null;

            if(response.data[0]!== undefined && response.data[0].roomChargesBilled !== true)
                stayResponse = response.data[0];

            if(response.data[0]!== undefined && response.data[0].nursingChargesBilled !== true)
                nursingResponse = response.data[0];

            this.setState({
                inPatientRecord: response.data[0],
                stayResponse: stayResponse,
                nursingResponse: nursingResponse
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
            billTotal += this.state.prescription.prescriptionCost;
            serialNumber++;
            billPrescription = (
                <tr key="billPrescription">
                    <td>{serialNumber}</td>
                    <td>{"Prescription"}</td>
                    <td>{this.state.prescription.prescriptionCost.toFixed(2)}</td>
                </tr>
            );
        }
        else
            billPrescription = null;

        if(this.state.consultations !== null) {
            billTotal += this.state.consultations[0].doctorId.consultationFee;
            serialNumber++;
            billConsultation = (
                <tr key="billConsultation">
                    <td>{serialNumber}</td>
                    <td>{"Consultation"}</td>
                    <td>{this.state.consultations[0].doctorId.consultationFee.toFixed(2)}</td>
                </tr>
            );
        }
        else
            billConsultation = null;

        if(this.state.stayTotal !== null) {
            billTotal += this.state.stayTotal;
            serialNumber++;
            billStay = (
                <tr key="billStay">
                    <td>{serialNumber}</td>
                    <td>{"Stay"}</td>
                    <td>{this.state.stayTotal.toFixed(2)}</td>
                </tr>
            );
        }
        else
            billStay = null;

        if(this.state.nursingTotal !== null) {
            billTotal += this.state.nursingTotal;
            serialNumber++;
            billNursingCharges = (
                <tr key="billNursingCharges">
                    <td>{serialNumber}</td>
                    <td>{"Nursing Charges"}</td>
                    <td>{this.state.nursingTotal.toFixed(2)}</td>
                </tr>
            );
        }
        else
            billNursingCharges = null;

        if(this.state.labsTotal !== null) {
            billTotal += this.state.labsTotal;
            serialNumber++;
            billLabCharges = (
                <tr key="billLabCharges">
                    <td>{serialNumber}</td>
                    <td>{"Lab Charges"}</td>
                    <td>{this.state.labsTotal.toFixed(2)}</td>
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
                    <td>{billTotal.toFixed(2)}</td>
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
        let generateBillButton = false;
        if(this.state.prescription !== null 
            || this.state.consultations !== null 
            || this.state.stayTotal !== null
            || this.state.nursingTotal !== null
            || this.state.labsTotal !== null
            )
            {
                generateBillButton = true;
            }
        return (
            <div className="container-fluid">
                <Alert color="info"><b>Billing</b></Alert>

                <Row>
                    <Col sm="4">
                        <Form inline className="container mt-5" onSubmit={this.handleSubmit.bind(this)}>
                            <FormGroup>
                                <Label for="patientId" className="mb-2 mr-sm-2 mb-sm-0">Patient Id:</Label>
                                <Input required type="text" id="patientId" name="patientId" className="mb-2 mr-sm-2 mb-sm-0" onChange={(event) => {this.handleChange(event)}}/>
                            </FormGroup>
                            <Button color="info" type="submit">Load</Button>
                        </Form>
                    </Col>

                    <Col sm="4">
                    <UncontrolledButtonDropdown className="mt-5">
                        <DropdownToggle color="info" caret>
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

                <Button color="info" className="mb-5" disabled={!generateBillButton} onClick={this.handleGenerateBill.bind(this)}>Generate Bill</Button>

                <PrescriptionBilling modal={this.state.showPrescriptionPopUp} toggle={this.togglePrescriptionPopUp} prescription={this.state.prescription} setPrescription={this.setPrescription.bind(this)} prescriptionsResponse={this.state.prescriptionsResponse}/>
                <ConsultationBilling modal={this.state.showConsultationsPopUp} toggle={this.toggleConsultationsPopUp} consultations={this.state.consultations} setConsultations={this.setConsultations.bind(this)} consultationsResponse={this.state.consultationsResponse}/>
                <StayBilling modal={this.state.showStayPopUp} toggle={this.toggleStayPopUp} stay={this.state.stay} setStay={this.setStay.bind(this)} stayResponse={this.state.stayResponse}/>
                <LabBilling modal={this.state.showLabsPopUp} toggle={this.toggleLabsPopUp} labs={this.state.labs} setLabs={this.setLabs.bind(this)} labsResponse={this.state.labsResponse} setLabsTotal={this.setLabsTotal.bind(this)}/>
                <NursingBilling modal={this.state.showNursingPopUp} toggle={this.toggleNursingPopUp} nursing={this.state.nursing} setNursing={this.setNursing.bind(this)} nursingResponse={this.state.nursingResponse}/>
            </div>
        );
    }
}

export default Billing;