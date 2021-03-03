<<<<<<< HEAD
import axios from 'axios';
=======
import API from '../api/api';
>>>>>>> main
import React, {Component} from 'react';
import { Button, Col, Row} from 'reactstrap';
import AddInPatient from './AddInPatient';
import EditInPatient from './EditInPatient';
import InPatientDetails from './InPatientDetails';

class InPatients extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inPatientList: [],
            page: "list",
            inPatientDetails: null,
            addPatientId: null,
            addRoomNo: null,
            addAdmissionDate: null,
            editAdmissionDate: null,
            editDischargeDate: null
        }
    }

    async componentDidMount() {
        try {
<<<<<<< HEAD
            const response = await axios.get("http://localhost:8081/inpatientrecord");
=======
            const response = await API.get("inpatientrecord");
>>>>>>> main
            this.setState({
                inPatientList: response.data
            });
        }
        catch(error) {
            alert(error)
        }
    }

    handleViewClick = (inPatientDetails) => {
        this.setState({
            page: "view",
            inPatientDetails: inPatientDetails
        });
    }

    handleAddClick = () => {
        this.setState({
            page: "add"
        });
    }

    handleEditClick = () => {
        this.setState({
            page: "edit"
        });
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        switch(name) {
            case "patientId":
                this.setState({
                    addPatientId: value
                });
                break;
            case "roomNo":
                this.setState({
                    addRoomNo: value
                });
                break;
            case "admissionDate":
                this.setState({
                    addAdmissionDate: value
                });
                break;
            case "editAdmissionDate":
                this.setState({
                    editAdmissionDate: value
                });
                break;
            case "editDischargeDate":
                this.setState({
                    editDischargeDate: value
                });
                break;
            default:
                break;
        }
    }

    async handleAddSubmit(event) {
        event.preventDefault();

        try {
<<<<<<< HEAD
            const response = await axios.post(
                `http://localhost:8081/inpatientrecord/${this.state.addPatientId}/${this.state.addRoomNo}`,
=======
            const response = await API.post(
                `inpatientrecord/${this.state.addPatientId}/${this.state.addRoomNo}`,
>>>>>>> main
                {
                    admissionDate: this.state.addAdmissionDate
                }
            );

            alert(response.data);
        }
        catch(error) {
            alert(error);
        }
    }

    async handleEditSubmit(event) {
        event.preventDefault();

        try {
<<<<<<< HEAD
            const response = await axios.put(
                `http://localhost:8081/inpatientrecord`,
=======
            const response = await API.put(
                `inpatientrecord`,
>>>>>>> main
                {
                    inPatientRecordId: this.state.inPatientDetails.inPatientRecordId,
                    admissionDate: this.state.addAdmissionDate,
                    dischargeDate: this.state.editDischargeDate
                }
            );

            alert(response.data);
        }
        catch(error) {
            alert(error);
        }
    }

    async handleGetBack() {
        this.setState({
            page: "list"
        });

        try {
<<<<<<< HEAD
            const response = await axios.get("http://localhost:8081/inpatientrecord");
=======
            const response = await API.get("inpatientrecord");
>>>>>>> main
            this.setState({
                inPatientList: response.data
            });
        }
        catch(error) {
            alert(error)
        }
    }

    async handleBackToDetails() {
        this.setState({
            page: "view"
        });

        try {
<<<<<<< HEAD
            const response = await axios.get(`http://localhost:8081/inpatientrecord/${this.state.inPatientDetails.inPatientRecordId}`);
=======
            const response = await API.get(`inpatientrecord/${this.state.inPatientDetails.inPatientRecordId}`);
>>>>>>> main
            this.setState({
                inPatientDetails: response.data
            });
        }
        catch(error) {
            alert(error)
        }
    }

    renderTable = () => {
        return (
            this.state.inPatientList.map((inPatient) => {
                return (
                    <tr key={inPatient.inPatientRecordId}>
                        <td>{inPatient.inPatientRecordId}</td>
                        <td>{inPatient.patient.patientId}</td>
                        <td>{inPatient.room.roomNo}</td>
                        <td><button className="btn btn-primary" onClick = {()=>this.handleViewClick(inPatient)}>View</button></td>
                    </tr>
                );
            })
        );
    }

    renderContent = () => {
        const inPatientList = (
            <div className="container-fluid">
                <Row>
                    <Col sm={9}>
                        <h3>In Patient List</h3>
                    </Col>

                    <Col sm={3}>
                        <Button className="mt-3" onClick={this.handleAddClick}>Add In Patient</Button>
                    </Col>
                </Row>

                <table className="table container" style={{marginTop:'40px'}}>
                <thead>
                    <tr key="table-header">
                        <th scope="col">In Patient Id</th>
                        <th scope="col">Patient Id</th>
                        <th scope="col">Room Number</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderTable()}
                </tbody>
            </table>
            </div>
        );

        if(this.state.page === "list") {
            return (
                inPatientList
            );
        }
        else if(this.state.page === "view") {
            return (
                <InPatientDetails inPatientDetails={this.state.inPatientDetails} back={this.handleGetBack.bind(this)} edit={this.handleEditClick.bind(this)}/>
            );
        }
        else if(this.state.page === "add") {
            return (
                <AddInPatient handleChange={this.handleChange} handleAddSubmit={this.handleAddSubmit.bind(this)} back={this.handleGetBack.bind(this)}/>
            );
        }
        else if(this.state.page === "edit") {
            return (
                <EditInPatient inPatientDetails={this.state.inPatientDetails} handleChange={this.handleChange} handleEditSubmit={this.handleEditSubmit.bind(this)} backToDetails={this.handleBackToDetails.bind(this)} backToList={this.handleGetBack.bind(this)}/>
            );
        }
        else{
            return (
                null
            );
        }
    }

    render() {
        return (
            this.renderContent()
        );
    }
}

export default InPatients;