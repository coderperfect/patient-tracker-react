import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

const PrescriptionBilling = (props) => {
    const {
        modal,
        toggle,
        className
    } = props;

    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);

    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
    }

    const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
    }

    const renderPrescriptionListTable = () => {
        return (
            <tbody>
                <tr key="6">
                    <td><Link color="success" onClick={toggleNested}>{"6"}</Link></td>
                    <td>{"4"}</td>
                    <td>{"70000.00"}</td>
                </tr>
                <tr key="10">
                    <td><Link color="success" onClick={toggleNested}>{"10"}</Link></td>
                    <td>{"5"}</td>
                    <td>{"50000.00"}</td>
                </tr>
                <tr key="18">
                    <td><Link color="success" onClick={toggleNested}>{"18"}</Link></td>
                    <td>{"3"}</td>
                    <td>{"140000.00"}</td>
                </tr>
            </tbody>
        );
    }

    const renderPrescriptionTable = () => {
        return (
            <tbody>
                <tr key="6">
                    <td><Link color="success" onClick={toggleNested}>{"6"}</Link></td>
                    <td>{"1"}</td>
                    <td>{"70000.00"}</td>
                </tr>
                <tr key="10">
                    <td><Link color="success" onClick={toggleNested}>{"10"}</Link></td>
                    <td>{"15"}</td>
                    <td>{"50000.00"}</td>
                </tr>
                <tr key="18">
                    <td><Link color="success" onClick={toggleNested}>{"18"}</Link></td>
                    <td>{"1"}</td>
                    <td>{"140000.00"}</td>
                </tr>
            </tbody>
        );
    }

    const nestedModalContent = (
        <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            <ModalHeader>Prescription Id: One</ModalHeader>

            <ModalBody>Medicines</ModalBody>

            <ModalFooter>
                <Button color="secondary" onClick={toggleAll}>Add To Bill</Button>
            </ModalFooter>
        </Modal>
    );

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className={className}>

                <ModalHeader toggle={toggle}>Prescriptions Not Billed</ModalHeader>

                <ModalBody>
                    <h6>Select  Prescription</h6>

                    <Table bordered size="sm" className="container" style={{marginTop:'40px'}}>
                        <thead>
                            <tr key="table-header">
                                <th scope="col">Prescription Id</th>
                                <th scope="col">Number of Items</th>
                                <th scope="col">Amount (Rs.)</th>
                            </tr>
                        </thead>
                        {renderPrescriptionListTable()}
                    </Table>
                    
                    <br/>

                    {nestedModalContent}
                </ModalBody>
                
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default PrescriptionBilling;