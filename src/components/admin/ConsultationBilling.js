import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

const ConsultationBilling = (props) => {
    const {
        modal,
        toggle,
        className,
        consultations,
        setConsultations,
        consultationsResponse
    } = props;

    const renderConsultationListTable = () => {
        return (
            <tbody>
                <tr key="1">
                    <td>{"1"}</td>
                    <td>{"Lee"}</td>
                    <td>{"22-07-7070"}</td>
                    <td>{"MD"}</td>
                    <td>{"7000"}</td>
                </tr>
                <tr key="2">
                    <td>{"2"}</td>
                    <td>{"Anne"}</td>
                    <td>{"24-08-3030"}</td>
                    <td>{"MD"}</td>
                    <td>{"7000"}</td>
                </tr>
                <tr key="3">
                    <td>{"3"}</td>
                    <td>{"Henry"}</td>
                    <td>{"140000.00"}</td>
                    <td>{"MD"}</td>
                    <td>{"7000"}</td>
                </tr>
                <tr key="4">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{"Total"}</td>
                    <td>{"21000"}</td>
                </tr>
            </tbody>
        );
    }

    return (
        <div>
            <Modal size="lg" isOpen={modal} toggle={toggle} className={className}>

                <ModalHeader toggle={toggle}>Consultations Not Billed</ModalHeader>

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
                    <Button color="primary" onClick={() => {setConsultations(true); toggle()}}>Add to Bill</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ConsultationBilling;