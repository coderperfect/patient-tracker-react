import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

const StayBilling = (props) => {
    const {
        modal,
        toggle,
        className,
        stay,
        setStay,
        stayResponse
    } = props;

    let stayTotal = null;

    const renderStayTable = () => {
        if(stayResponse === null || stayResponse === undefined)
            return null;
        else{
            var dateAdmission = new Date(stayResponse.admissionDate);
            var dateToday = new Date();
            var Difference_In_Time = dateToday.getTime() - dateAdmission.getTime(); 
            var numberOfDays = Difference_In_Time / (1000 * 3600 * 24);

            stayTotal =  numberOfDays*stayResponse.room.tariff;

            return (
                <tbody>
                    <tr key={stayResponse.inPatientRecordId}>
                        <td>{stayResponse.room.roomType}</td>
                        <td>{stayResponse.room.tariff}</td>
                        <td>{numberOfDays}</td>
                        <td>{numberOfDays*stayResponse.room.tariff}</td>
                    </tr>
                </tbody>
            );
        }
    }

    return (
        <div>
            <Modal size="lg" isOpen={modal} toggle={toggle} className={className}>

                <ModalHeader toggle={toggle}>Stay</ModalHeader>

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
                    <Button color="primary" disabled={stay===null?false:true} onClick={() => {setStay(stayResponse, stayTotal); toggle()}}>Add to Bill</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default StayBilling;