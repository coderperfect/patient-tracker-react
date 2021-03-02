import React, { Component } from 'react';

function TestDetailsForPatient(props) {
    return(
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-xs-12'>
                    <p className='my-5' style={{fontSize:'1.5rem'}}>Test Details</p>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td>Test ID</td>
                                <td>{ props.location.aboutProps.report.test.testId}</td>
                            </tr>
                            <tr>
                                <td>Test Name</td>
                                <td>{props.location.aboutProps.report.test.testName}</td>
                            </tr>
                            <tr>
                                <td>Test Cost</td>
                                <td>{props.location.aboutProps.report.test.testCost}</td>
                            </tr>
                            <tr>
                                <td>Test Baseline Value</td>
                                <td>{props.location.aboutProps.report.test.baselineValues}</td>
                            </tr>
                            <tr>
                                <td>Test Result</td>
                                <td>{props.location.aboutProps.report.testResult || <code>No Result</code>}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TestDetailsForPatient;