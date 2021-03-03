import React from 'react'
import { Container, Table} from 'reactstrap';
function DietDetails(props) {
    return (
        <div className="container">
            <Table>
            <tr><th>Diet and Exercises For You</th></tr>
            <tr> <td>{props.location.aboutProps.treatment.dietExcerciseDescription}</td></tr>
           </Table>
        </div>
    )
}

export default DietDetails
