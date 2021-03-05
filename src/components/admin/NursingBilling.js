import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Alert } from 'reactstrap';
import LoadingComponent from '../LoadingComponent';

const NursingBilling = (props) => {
    const {
        modal,
        toggle,
        className,
        nursing,
        setNursing,
        nursingResponse,
        billing
    } = props;

    let nursingTotal = null;

    const renderNursingTable = () => {
        if(nursingResponse === null || nursingResponse === undefined || nursingResponse === "billed")
            return null;
        else{
            var dateAdmission = new Date(nursingResponse.admissionDate);
            var dateToday = new Date();
            var Difference_In_Time = dateToday.getTime() - dateAdmission.getTime(); 
            var numberOfDays = Math.floor(Difference_In_Time / (1000 * 3600 * 24));

            nursingTotal =  numberOfDays*nursingResponse.room.tariff;

            return (
                <tbody>
                    <tr key="1">
                        <td>{nursingResponse.room.roomType}</td>
                        <td>{numberOfDays}</td>
                        <td>{(numberOfDays*nursingResponse.room.tariff).toFixed(2)}</td>
                    </tr>
                </tbody>
            );
        }
    }

    const renderContent = () => {
        let content = (
            <span>
                <ModalBody>

                    <Table bordered size="sm" className="container" style={{marginTop:'40px'}}>
                        <thead>
                            <tr key="table-header">
                                <th scope="col">Room Type</th>
                                <th scope="col">Number Of Days</th>
                                <th scope="col">Total Amount (Rs.)</th>
                            </tr>
                        </thead>
                        {renderNursingTable()}
                    </Table>

                    <br/>

                </ModalBody>

                <ModalFooter>
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                    <Button color="info" disabled={nursing===null && (nursingResponse !== null && nursingResponse !== undefined)?false:true} onClick={() => {setNursing(nursingResponse, nursingTotal); toggle()}}>Add to Bill</Button>
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
        else if(nursingResponse === null) {
            return (
                <span>
                    <LoadingComponent/>
                    <ModalFooter>
                        <Button color="info" onClick={toggle}>Ok</Button>
                    </ModalFooter>
                </span>
            );
        }
        else if(nursingResponse === "billed") {
            return (
                <span>
                    <Alert color="info">
                        <h4 className="alert-heading">No Unbilled Nursing Charges</h4>
                        <p>
                            There are no unbilled nursing charges for this patient
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

                <ModalHeader toggle={toggle}>Nursing Charges</ModalHeader>
                {renderContent()}

            </Modal>
        </div>
    );
}

export default NursingBilling;