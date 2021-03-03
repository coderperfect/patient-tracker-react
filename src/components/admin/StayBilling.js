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

    const renderStayTable = () => {
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
                    <Button color="primary" onClick={() => {setStay(true); toggle()}}>Add to Bill</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default StayBilling;