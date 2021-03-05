import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

const NursingBilling = (props) => {
    const {
        modal,
        toggle,
        className,
        nursing,
        setNursing,
        nursingResponse
    } = props;

    let nursingTotal = null;

    const renderNursingTable = () => {
        if(nursingResponse === null || nursingResponse === undefined)
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

    return (
        <div>
            <Modal size="lg" isOpen={modal} toggle={toggle} className={className}>

                <ModalHeader toggle={toggle}>Nursing Charges</ModalHeader>

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
                    <Button color="primary" disabled={nursing===null && (nursingResponse !== null && nursingResponse !== undefined)?false:true} onClick={() => {setNursing(nursingResponse, nursingTotal); toggle()}}>Add to Bill</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default NursingBilling;