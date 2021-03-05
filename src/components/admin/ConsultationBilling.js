import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Alert } from 'reactstrap';
import LoadingComponent from '../LoadingComponent';

const ConsultationBilling = (props) => {
    const {
        modal,
        toggle,
        className,
        consultations,
        setConsultations,
        consultationsResponse,
        billing
    } = props;

    const renderConsultationListTable = () => {
        
        if(consultationsResponse === null || consultationsResponse.length === 0)
            return null;
        else{
            return (
                <tbody>
                    <tr key="1">
                        <td>{"1"}</td>
                        <td>{consultationsResponse[0].doctorId.user.firstName + " " + consultationsResponse[0].doctorId.user.lastName}</td>
                        <td>{consultationsResponse[0].date}</td>
                        <td>{consultationsResponse[0].doctorId.specialization}</td>
                        <td>{consultationsResponse[0].doctorId.consultationFee}</td>
                    </tr>
                    <tr key="1">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{"Total"}</td>
                        <td>{consultationsResponse[0].doctorId.consultationFee}</td>
                    </tr>
                </tbody>
            );
        }
    }

    const renderContent = () => {
        let content = (
            <span>
                <ModalBody>
                    <h6>Consultations</h6>

                    <Table bordered size="sm" className="container" style={{marginTop:'40px'}}>
                        <thead>
                            <tr key="table-header">
                                <th scope="col">Serial Number</th>
                                <th scope="col">Doctor Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Specialisation</th>
                                <th scope="col">Fee (Rs.)</th>
                            </tr>
                        </thead>
                        {renderConsultationListTable()}
                    </Table>
                    
                    <br/>

                </ModalBody>
                
                <ModalFooter>
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                    <Button color="info" disabled={consultations===null && (consultationsResponse !== null && consultationsResponse.length !== 0)?false:true} onClick={() => {setConsultations(consultationsResponse); toggle()}}>Add to Bill</Button>
                </ModalFooter>
            </span>
        );

        if(billing === null) {
            return (
                <span>
                    <Alert color="danger">
                        <h4 className="alert-heading">Please select patient</h4>
                        <p>
                            Please select patient to add components
                        </p>
                    </Alert>
                    <ModalFooter>
                        <Button color="info" onClick={toggle}>Ok</Button>
                    </ModalFooter>
                </span>
            );
        }
        else if(consultationsResponse === null) {
            return (
                <span>
                    <LoadingComponent/>
                    <ModalFooter>
                        <Button color="info" onClick={toggle}>Ok</Button>
                    </ModalFooter>
                </span>
            );
        }
        else if(consultationsResponse.length === 0) {
            return (
                <span>
                    <Alert color="info">
                        <h4 className="alert-heading">No Unbilled Consultations</h4>
                        <p>
                            There are no unbilled consultations for this patient
                        </p>
                    </Alert>
                    <ModalFooter>
                            <Button color = "info" onClick={toggle}>Ok</Button>
                    </ModalFooter>
                </span>
            );
        }
        else {
            return (content);
        }
    }

    return (
        <div>
            <Modal size="lg" isOpen={modal} toggle={toggle} className={className}>

                <ModalHeader toggle={toggle}>Consultations Not Billed</ModalHeader>
                {renderContent()}
                
            </Modal>
        </div>
    );
}

export default ConsultationBilling;