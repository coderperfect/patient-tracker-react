import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

const LabBilling = (props) => {
    const {
        modal,
        toggle,
        className,
        Labs,
        setLabs,
        LabsResponse
    } = props;

    const renderLabListTable = () => {
        return (
            <tbody>
                <tr key="1">
                    <td>{"1"}</td>
                    <td>{"Lee"}</td>
                    <td>{"22-07-7070"}</td>
                    <td>{"7000"}</td>
                </tr>
                <tr key="2">
                    <td>{"2"}</td>
                    <td>{"Anne"}</td>
                    <td>{"24-08-3030"}</td>
                    <td>{"7000"}</td>
                </tr>
                <tr key="3">
                    <td>{"3"}</td>
                    <td>{"Henry"}</td>
                    <td>{"140000.00"}</td>
                    <td>{"7000"}</td>
                </tr>
                <tr key="4">
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

                <ModalHeader toggle={toggle}>Lab Charges Not Billed</ModalHeader>

                <ModalBody>

                    <Table bordered size="sm" className="container" style={{marginTop:'40px'}}>
                        <thead>
                            <tr key="table-header">
                                <th scope="col">Test Result Id</th>
                                <th scope="col">Test Id</th>
                                <th scope="col">Test Name</th>
                                <th scope="col">Cost (Rs.)</th>
                            </tr>
                        </thead>
                        {renderLabListTable()}
                    </Table>
                    
                    <br/>

                </ModalBody>
                
                <ModalFooter>
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                    <Button color="primary" onClick={() => {setLabs(true); toggle()}}>Add to Bill</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default LabBilling;