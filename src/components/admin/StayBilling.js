import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Alert } from 'reactstrap';
import LoadingComponent from '../LoadingComponent';

const StayBilling = (props) => {
    const {
        modal,
        toggle,
        className,
        stay,
        setStay,
        stayResponse,
        billing
    } = props;

    let stayTotal = null;

    const renderStayTable = () => {
        if(stayResponse === null || stayResponse === undefined || stayResponse === "billed")
            return null;
        else{
            var dateAdmission = new Date(stayResponse.admissionDate);
            var dateToday = new Date();
            var Difference_In_Time = dateToday.getTime() - dateAdmission.getTime(); 
            var numberOfDays = Math.floor(Difference_In_Time / (1000 * 3600 * 24));

            stayTotal =  numberOfDays*stayResponse.room.tariff;
            return (
                <tbody>
                    <tr key={stayResponse.inPatientRecordId}>
                        <td>{stayResponse.room.roomType}</td>
                        <td>{stayResponse.room.tariff}</td>
                        <td>{numberOfDays}</td>
                        <td>{(numberOfDays*stayResponse.room.tariff).toFixed(2)}</td>
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
                                <th scope="col">Tariff</th>
                                <th scope="col">Number Of Days</th>
                                <th scope="col">Total Amount (Rs.)</th>
                            </tr>
                        </thead>
                        {renderStayTable()}
                    </Table>

                    <br/>

                </ModalBody>

                <ModalFooter>
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                    <Button color="info" disabled={stay===null && (stayResponse !== null && stayResponse !== undefined)?false:true} onClick={() => {setStay(stayResponse, stayTotal); toggle()}}>Add to Bill</Button>
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
        else if(stayResponse === null) {
            return (
                <span>
                    <LoadingComponent/>
                    <ModalFooter>
                        <Button color="info" onClick={toggle}>Ok</Button>
                    </ModalFooter>
                </span>
            );
        }
        else if(stayResponse === "billed") {
            return (
                <span>
                    <Alert color="info">
                        <h4 className="alert-heading">No Unbilled Stay Charges Results</h4>
                        <p>
                            There are no unbilled stay charges for this patient
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

                <ModalHeader toggle={toggle}>Stay</ModalHeader>
                {renderContent()}
                
            </Modal>
        </div>
    );
}

export default StayBilling;