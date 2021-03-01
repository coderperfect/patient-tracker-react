import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
                    Select <Link color="success" onClick={toggleNested}>One</Link> Prescription
                    
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