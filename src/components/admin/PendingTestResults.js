import API from '../api/api';
import React, {Component} from 'react';
import UpdatePendingTestResult from './UpdatePendingTestResult';
import LoadingComponent from '../LoadingComponent';
import {Alert,Table} from "reactstrap";
class PendingTestResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            testReportList: null,
            update: false,
            updateTestResultId: null,
            updateTestResultText: null
        }
    }

    async componentDidMount() {
        try {
            const response = await API.get("testreport");
            this.setState({
                testReportList: response.data
            });
        }
        catch(error) {
            alert(error)
        }
    }

    async handleGetBack() {
        this.setState({
            update: false
        });

        try {
            const response = await API.get("testreport");
            this.setState({
                testReportList: response.data
            });
        }
        catch(error) {
            alert(error)
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        switch(name) {
            case "testResultId":
                this.setState({
                    updateTestResultId: value
                });
                break;
            case "testResult":
                this.setState({
                    updateTestResultText: value
                });
                break;
            default:
                break;
        }
    }

    handleUpdateClick = (testResultId) => {
        this.setState({
            update: true,
            updateTestResultId: testResultId
        });
    }

    async handleUpdateSubmit(event) {
        event.preventDefault();

        try {
            const response = await API.put(
                `testreport/${this.state.updateTestResultId}`,
                {
                    testResult: this.state.updateTestResultText
                }
            );

            alert(response.data);
        }
        catch(error) {
            alert(error);
        }
    }

    renderTable = () => {
        return (
            this.state.testReportList.map((testReport) => {
                return (
                    <tr key={testReport.testResultId}>
                        <td>{testReport.testResultId}</td>
                        <td>{testReport.patient.patientId}</td>
                        <td>{testReport.doctor.doctorId}</td>
                        <td><button className="btn btn-info" onClick = {()=>this.handleUpdateClick(testReport.testResultId)}>Update</button></td>
                    </tr>
                );
            })
        );
    }

    renderTableSkeleton = () => {
        if(this.state.testReportList === null){
            return <LoadingComponent/>
        }
        
        let table = (
            <Table striped  className="table container" style={{marginTop:'40px'}}>
                <thead>
                    <tr key="table-header">
                        <th scope="col">Test Result Id</th>
                        <th scope="col">Patient Id</th>
                        <th scope="col">Doctor Id</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderTable()}
                </tbody>
            </Table>
        );

        return table;
    }

    renderContent = () => {
        const testResultsPendingUpdate = (
            <div className="container-fluid">
                <Alert color="info">Test Results Pending Update</Alert>

                {this.renderTableSkeleton()}
            </div>
        );

        if(!this.state.update) {
            return (
                testResultsPendingUpdate
            );
        }
        else{
            return (
                <UpdatePendingTestResult 
                    updateTestResultId={this.state.updateTestResultId}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleUpdateSubmit.bind(this)}
                    handleBack={this.handleGetBack.bind(this)}
                />
            );
        }
    }
    render() {
        return (
            this.renderContent()
        );
    }
}

export default PendingTestResults;