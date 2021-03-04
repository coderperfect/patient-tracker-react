import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

const PrescriptionBilling = (props) => {
    const {
        modal,
        toggle,
        className,
        prescription,
        setPrescription,
        prescriptionsResponse
    } = props;

    const [popUpPrescription, setPopUpPrescription] = useState(null);

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
        let prescriptions = () => {
            if(prescriptionsResponse !== null){
                return (
                    prescriptionsResponse.map((prescription) => {
                        return (
                            <tr key={prescription.prescriptionId}>
                                <td><Link color="success" onClick={() => {setPopUpPrescription(prescription); toggleNested()}}>{prescription.prescriptionId}</Link></td>
                                <td>{prescription.medicineQuantities !== null ? prescription.medicineQuantities.length : "loading...."}</td>
                                <td>{prescription.prescriptionCost}</td>
                            </tr> 
                        )
                    })
                );
            }
            else {
                return null;
            }
        }

        return (
            <tbody>
                {prescriptions()}
            </tbody>
        );
    }

    const renderPrescriptionTable = () => {
        let medicines = null;
        let serialNumber = 0;

        if(popUpPrescription !== null) {
            medicines = popUpPrescription.medicineQuantities.map((medicineQuantity) => {
                serialNumber++;
                return (
                    <tr key={medicineQuantity.medicineQuantityid}>
                        <td>{serialNumber}</td>
                        <td>{medicineQuantity.medicine.medicineName}</td>
                        <td>{(medicineQuantity.quantity*medicineQuantity.medicine.medicineCost).toFixed(2)}</td>
                    </tr>
                )
            });
        }

        return (
            <tbody>
                {medicines}
                <tr key="total">
                    <td>{}</td>
                    <td>{"Total"}</td>
                    <td>{popUpPrescription ? popUpPrescription.prescriptionCost : null}</td>
                </tr>
            </tbody>
        );
    }

    const nestedModalContent = (
        <Modal size="lg" isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            <ModalHeader>Prescription Id: {popUpPrescription ? popUpPrescription.prescriptionId : null}</ModalHeader>

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
            </ModalFooter>
        </Modal>
    );

    return (
        <div>
            <Modal size="lg" isOpen={modal} toggle={toggle} className={className}>

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