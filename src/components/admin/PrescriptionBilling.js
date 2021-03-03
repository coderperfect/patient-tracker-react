import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

const PrescriptionBilling = (props) => {
    const {
        modal,
        toggle,
<<<<<<< HEAD
        className,
        prescription,
        setPrescription
    } = props;

    const [popUpPrescription, setPopUpPrescription] = useState(null);

=======
        className
    } = props;

>>>>>>> main
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
<<<<<<< HEAD
                    <td><Link color="success" onClick={() => {setPopUpPrescription(6); toggleNested()}}>{"6"}</Link></td>
                    <td>{"4"}</td>
                    <td>{"70000.00"}</td>
                </tr>
                <tr key="10">
                    <td><Link color="success" onClick={() => {setPopUpPrescription(10); toggleNested()}}>{"10"}</Link></td>
                    <td>{"5"}</td>
                    <td>{"50000.00"}</td>
                </tr>
                <tr key="18">
                    <td><Link color="success" onClick={() => {setPopUpPrescription(18); toggleNested()}}>{"18"}</Link></td>
                    <td>{"3"}</td>
                    <td>{"140000.00"}</td>
                </tr>
            </tbody>
        );
    }

    const renderPrescriptionTable = () => {
        return (
            <tbody>
                <tr key="1">
                    <td>{"1"}</td>
                    <td>{"Paracetamol"}</td>
                    <td>{"100.00"}</td>
                </tr>
                <tr key="2">
                    <td>{"2"}</td>
                    <td>{"Vitamin C"}</td>
                    <td>{"500.00"}</td>
                </tr>
                <tr key="3">
                    <td>{"3"}</td>
                    <td>{"Penicillin"}</td>
                    <td>{"1400.00"}</td>
                </tr>
                <tr key="total">
                    <td>{}</td>
                    <td>{"Total"}</td>
                    <td>{"2000.00"}</td>
=======
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
>>>>>>> main
                </tr>
            </tbody>
        );
    }

    const nestedModalContent = (
<<<<<<< HEAD
        <Modal size="lg" isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            <ModalHeader>Prescription Id: {popUpPrescription}</ModalHeader>

            <ModalBody>
                
                <h6>Medicines</h6>

                <Table bordered size="sm" className="container" style={{marginTop:'40px'}}>
                    <thead>
                        <tr key="table-header">
                            <th scope="col">Serial Number</th>
                            <th scope="col">Medicine Name</th>
                            <th scope="col">Price (Rs.)</th>
                        </tr>
                    </thead>
                    {renderPrescriptionTable()}
                </Table>

            </ModalBody>

            <ModalFooter>
                <Button color="danger" onClick={toggleNested}>Back</Button>
                <Button color="info" disabled={prescription ? true : false} onClick={()=>{setPrescription(popUpPrescription); toggleAll()}}>Add To Bill</Button>
=======
        <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            <ModalHeader>Prescription Id: One</ModalHeader>

            <ModalBody>Medicines</ModalBody>

            <ModalFooter>
                <Button color="secondary" onClick={toggleAll}>Add To Bill</Button>
>>>>>>> main
            </ModalFooter>
        </Modal>
    );

    return (
        <div>
<<<<<<< HEAD
            <Modal size="lg" isOpen={modal} toggle={toggle} className={className}>
=======
            <Modal isOpen={modal} toggle={toggle} className={className}>
>>>>>>> main

                <ModalHeader toggle={toggle}>Prescriptions Not Billed</ModalHeader>

                <ModalBody>
                    <h6>Select  Prescription</h6>

                    <Table bordered size="sm" className="container" style={{marginTop:'40px'}}>
                        <thead>
                            <tr key="table-header">
                                <th scope="col">Prescription Id</th>
<<<<<<< HEAD
                                <th scope="col">Number of Items</th>
=======
                                <th scope="col">PatientId</th>
>>>>>>> main
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