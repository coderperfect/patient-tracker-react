import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

const LabBilling = (props) => {
    const {
        modal,
        toggle,
        className,
        labs,
        setLabs,
        labsResponse,
        setLabsTotal
    } = props;

    let labsTotal = null;

    const renderLabListTable = () => {
        let total = 0;

        let labs = () => {
            if(labsResponse !== null) {
                let serialNumber = 0;
                return (
                    labsResponse.map((lab) => {
                        serialNumber++;
                        total += lab.test.testCost;
                        return (
                            <tr key={serialNumber}>
                                <td>{serialNumber}</td>
                                <td>{lab.testResultId}</td>
                                <td>{lab.test.testId}</td>
                                <td>{lab.test.testName}</td>
                                <td>{lab.test.testCost}</td>
                            </tr>
                        )
                    })
                );
            }
            else {
                return null;
            }
        }

        const setLabsTotalLoc = (total) => {
            labsTotal = total;
        }

        return (
            <tbody>
                {labs()}
                {setLabsTotalLoc(total)}
                <tr key="4">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{"Total"}</td>
                    <td>{total}</td>
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
                                <th scope="col">Serial Number</th>
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
                    <Button color="primary" disabled={labs===null?false:true} onClick={() => {setLabs(labsResponse); setLabsTotal(labsTotal); toggle()}}>Add to Bill</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default LabBilling;