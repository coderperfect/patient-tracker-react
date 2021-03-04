import axios from 'axios';
import auth from "../authentication/auth";
export default axios.create({
  baseURL: `http://localhost:8081/`, timeout: 100000,
  headers :{ 'authorization': 'Bearer ' + auth.getAuthToken() } });