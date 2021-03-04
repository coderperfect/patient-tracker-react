import React, { useState,  useEffect } from "react";
import { useInput } from './inputhook';
import 'bootstrap/dist/js/bootstrap.js';
import "../Stylesheets/mystyle.css";
//import "../Stylesheets/styles.css";
import API from "../api/api";
import {CardBody,CardTitle, Card,Toast,ToastHeader, CardText, Badge} from 'reactstrap';
import {Button, Form, FormGroup, Label, Input, FormText, Table, Alert } from 'reactstrap';
import api from "../api/api";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import AsyncSelect from 'react-select/async';
import auth from "../authentication/auth";
import LoadingComponent from "../LoadingComponent";
import { useHistory } from "react-router-dom";

export function PrescriptionView(props) {

    const [prescriptions,setPrescriptions] = useState([]);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        API.get(`patientrecord/prescriptions/${auth.getRecordId()}/${auth.getDoctorId()}`)
        .then(response => {
            console.log(response.data);
            setPrescriptions(response.data);
            setLoading(false);
            
        })
    }, []);

    const handlelick = (event) => {
        localStorage.setItem("meds",JSON.stringify(event.medicineQuantities));
        localStorage.setItem("prepId",event.prescriptionId);
        setUpdate(true);
    }

    return !update ? (
        [
            loading ?
            (
                <LoadingComponent/>
            )
            :
            [
            prescriptions.length > 0 ?
            <div className="container" style={{paddingTop:"20px"}}>
                <Alert color="info"><b>Patient Prescription History</b></Alert>
            <Table borderless>
                <thead>
                    <tr>
                        <th>Prescription Id</th>
                        <th>Medicine Name</th>
                        <th>No.of.Days</th>
                        <th>Quantity</th>
                        <th>Update</th>
                    </tr>
                </thead>
                {
                    
                    (
                        prescriptions.map((object,index2) => {
                            const color = index2%2==0 ? "#FFFFFF" : "#F2F2F2";
                            return object.medicineQuantities.map((med,index) => {
                                const visible = index==0 ? true : false;
                                
                                return (
                                    <tbody style={{backgroundColor:color}}>
                                        <th scope="row">{visible ? object.prescriptionId : ""}</th>
                                        <td>{med.medicine.medicineName}</td>
                                        <td>{med.noOfDays}</td>
                                        <td>{med.quantity}</td>
                                        <Button color="info" id={object.prescriptionId} onClick={() => handlelick(object)} style={{visibility:visible ? "visible" : "hidden"}}>Update</Button>
                                    </tbody>
                                ) 
                            })
                        
                        })
                    )
                    
                }

            </Table>
            </div>
            :
                    (
                        <Alert color="danger">Patient has no Prescription History</Alert>
                    )
            ]
    ]
    )
    :
    (
        <PrescriptionComponent update={true}/>
    )
   
}

export function PrescriptionForm(props) {
    
    const { value:quant, bind:bindQuant, reset:resetQuant} = useInput(0);
    const { value:days, bind:bindDays, reset:resetDays} = useInput(0);
    const [medValid,setMedValid] = useState(true);
    const [quantValid, setQuantValid] = useState(true);
    const [daysValid, setDaysValid] = useState(true);

    var medicineQuantity={
        "noOfDays": -1,
        "quantity": -1,
        "medicine":{}
    }

    var prescriptions={
        "recordId":auth.getRecordId(),
        "doctorId":auth.getDoctorId(),
        "prescription":{
            "medicineQuantities":[],
            "prescriptionId":"",
        }
    }

    var medicineQuantities=[];

    var medicine={
        "medicineId": -1,
        "medicineName": "",
        "medicineCost":-1
    }
    
    var items=[];

    const loadOptions = (input, callback) => {
        var temp=[];
        API.get(`medicine/${input}`)
        .then(response => {
          
          response.data.map(med => {
              temp.push({value:med.medicineId, label:med.medicineName, quant:med.medicineCost})
          }
          )
          callback(temp);
        })
        
    }

    const handleOnSelect = (key) => {
        medicine.medicineId=key.value;
        medicine.medicineName=key.label;
        medicine.medicineCost=key.quant;
        localStorage.setItem("med",JSON.stringify(medicine));
    }

    const handleOnSearch = (string, results) => {
        console.log(string, results);
      }
    
    const validate = () => {
        let valid = true;
        if(JSON.parse(localStorage.getItem("med")).length ===0) {
             setMedValid(false);
             alert("Please Select Medicine\nPlease input all fields");
             valid = false;
        }
        if(quant<=0) {
            setQuantValid(false);
            valid = false;
        }
        if(days<=0) {
            setDaysValid(false);
            valid=false;
        }
        return valid;
    }
      
      const handleAdd = (event) => {
        if(!validate()) {
            return
        }
        medicineQuantity.noOfDays=days;
        medicineQuantity.quantity=quant;
        medicineQuantity.medicine=JSON.parse(localStorage.getItem("med"));
        medicineQuantities.push(medicineQuantity);
        console.log(medicineQuantities);
        var meds = JSON.parse(localStorage.getItem("meds"))
        console.log(meds);
        var temp = meds.filter(object => {
            if(object.medicine.medicineId===medicineQuantity.medicine.medicineId) {
                
                return object;
            }
        })
        if(temp.length>0) {
            alert("Medicine Already Exists")
            return
        }

        localStorage.setItem("medq",JSON.stringify(medicineQuantity));
        meds.push(medicineQuantity);
        localStorage.setItem("meds",JSON.stringify(meds));
        props.setMedicineQuantities(medicineQuantities);
      }
      
    return (
       
        <Form className="col col-sm-12" onSubmit={props.handleSubmit}>
            <FormGroup>
                <AsyncSelect 
                    row
                    loadOptions={loadOptions}
                    onChange={handleOnSelect}
                    placeholder={"Search Medicine"}
                    autoFocus
                    invalid = {!medValid}
                />
            </FormGroup>
            <FormGroup className="row">
                <Label  className="text-bold" for="cost">Medicine Quantity</Label>
                <Input  invalid={!quantValid} type="number"  {...bindQuant}  rows={4} name="cost" id="cost" placeholder="Enter Quantity" />
            </FormGroup>
            <FormGroup className="row">
                <Label  className="text-bold" for="cost">Medication Period</Label>
                <Input  invalid={!daysValid} type="number" {...bindDays}  rows={4} name="cost" id="cost" placeholder="Enter No of Days" />
            </FormGroup>
            <FormGroup className="row form-group" style={{display:"flex",justifyContent:"space-between"}}>
                <Button color="info" onClick={handleAdd}>Add</Button>
                <Button color="info" type="submit">{props.update ? "Update" : "Create"} Prescription</Button>
            </FormGroup>
        </Form> 
    )


}

export function Prescription(props) {
    const { value:days, bind:bindDays, reset:resetDays} = useInput(props.medicineQuantity.noOfDays);
    const { value:quant, bind:bindQuant, reset:resetQuant} = useInput(props.medicineQuantity.quantity);
    const visibile = props.update ? "visible" : "collapse";
    
     const handleUpdate = (medq) => {
        var meds = JSON.parse(localStorage.getItem("meds"));
        meds = meds.map(object => {
            var temp = Object.assign({}, object);
            console.log(medq,temp)
            if(temp.medicineQuantityid===medq.medicineQuantityid)
            {
                temp.quantity = quant;
                temp.noOfDays = days;
            }
            return temp;
        })
        
        localStorage.setItem("meds",JSON.stringify(meds));
        alert("Updated Medication");
    }

    return (
        <Toast>
            <Form>
            <ToastHeader>{props.medicineQuantity.medicine.medicineName}</ToastHeader>
            <FormGroup className="row">
                    <Label  className="text-bold" for="cost">Medicine Quantity</Label>
                    <Input  disabled={!props.update} type="number" {...bindQuant}  rows={4} name="cost" id="cost" placeholder="Enter Quantity" />
            </FormGroup>
            <FormGroup className="row">
                    <Label  className="text-bold" for="cost">Medication Period</Label>
                    <Input  disabled={!props.update} type="number" {...bindDays}  rows={4} name="cost" id="cost" placeholder="Enter No of Days" />
            </FormGroup>
            <FormGroup  className="row form-group" style={{visibility:visibile, display:"flex",justifyContent:"space-between"}}>
                <Button color="info" style={{visibility:visibile}} onClick={() =>{handleUpdate(props.medicineQuantity)}}>Update Medication</Button>
            </FormGroup>
            </Form>
        </Toast>
    )
}

export default function PrescriptionComponent(props) {
    const [medicineQuantities,setMedicineQuantities]=useState([]);
    let history = useHistory();

    var prescriptions={
        "recordId":auth.getRecordId(),
        "doctorId":auth.getDoctorId(),
        "prescription":{
            "medicineQuantities":medicineQuantities,
            "prescriptionId":"",
            
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        prescriptions.prescription.medicineQuantities=JSON.parse(localStorage.getItem("meds"));
        
        localStorage.setItem("meds",JSON.stringify([]))
        localStorage.setItem("med",JSON.stringify([]));
        localStorage.setItem("medq",JSON.stringify([]));

        if(props.update) {
            prescriptions.prescription.prescriptionId = JSON.parse(localStorage.getItem("prepId"));
            API.post("patientrecord/updateprescription",prescriptions)
            .then(response => {
                console.log(response);
                setMedicineQuantities([], ()=> {
                    
                })
                alert((props.update ? "Update" : "Created") + " Successfully");
                history.push("/doctor/patientrecord/patientrecords/"+auth.getRecordId());
            })
            
        }
        else {
            API.post("patientrecord/addprescription",prescriptions)
            .then(response => {
                console.log(response);
                setMedicineQuantities([], ()=> {
                    alert((props.update ? "Update" : "Created") + " Successfully");
                })
                alert((props.update ? "Update" : "Created") + " Successfully");
                history.push("/doctor/patientrecord/patientrecords/"+auth.getRecordId());
            })
           
        }
       
        
      }

    var meds = JSON.parse(localStorage.getItem("meds"))
    return (
        <div className="row" >
            <div className="col">
                <PrescriptionForm update={props.update} handleSubmit={handleSubmit} setMedicineQuantities={setMedicineQuantities}/>
            </div>
            
            <div className="col" style={{height: "500px", overflowY: "scroll"}}>
            {
                localStorage.getItem("meds") ?
                JSON.parse(localStorage.getItem("meds")).map(medicine => {
                    return <Prescription medicineQuantity={medicine} update={props.update}/>
                })
                :
                ""
            }
            </div>
        </div>
    
    )
    

}

