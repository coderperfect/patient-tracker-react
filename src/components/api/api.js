import axios from 'axios';
import auth from "../authentication/auth";
export default axios.create({
  baseURL: `http://13.126.253.32:8081/`, timeout: 100000,
  headers :{ 'authorization': 'Bearer ' + auth.getAuthToken() } });