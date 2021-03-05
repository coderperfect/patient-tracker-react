import React,{Component} from 'react';
import { Label } from 'reactstrap';
import API from '../api/api';

class Help extends Component {
    constructor(props){
        super(props);
        this.state = {
            issue: '',
            description: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        API.post(`/users/help`, this.state)
            .then(res => {
                alert(res.data);
            })
    }

    handleChange(event){
        this.setState({[event.target.name] : [event.target.value]});
    }

    render(){
        return(
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-8 justify-content-center'>
                        <form>
                            <div className='form-group'>
                                <label className='form-label'>Issue</label>
                                <input className='input' type='text' name='issue' value={this.state.issue} onChange={this.handleChange}/>
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Description</label>
                                <textarea name='description' value={this.state.description} rows='4' cols='20' onChange={this.handleChange}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}