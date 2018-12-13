/* eslint-disable */
import axios from 'axios';
import AuthService from '../auth/AuthService';
//  const API_URL = 'https://my.bbloom.io';
const API_URL = 'http://localhost:8000';

export class APIService{
    constructor(){
      
    }
    getLeads() {
        const url = `${API_URL}/leads/`;
        return axios.get(url, { headers: { Authorization: `Bearer ${AuthService.getAuthToken()}` }}).then(response => response.data);
    }
    getLeadsByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url, { headers: { Authorization: `Bearer ${AuthService.getAuthToken()}` }}).then(response => response.data);
        
    }
    getLead(pk) {
        const url = `${API_URL}/leads/${pk}`;
        return axios.get(url, { headers: { Authorization: `Bearer ${AuthService.getAuthToken()}` }}).then(response => response.data);
    }    
    deleteLead(lead){
        const url = `${API_URL}/leads/${lead.pk}`;
        return axios.delete(url, { headers: { Authorization: `Bearer ${AuthService.getAuthToken()}` }});

    }
    createLead(lead){
        const url = `${API_URL}/leads/`;
        const headers = {Authorization: `Bearer ${AuthService.getAuthToken()}`};
        return axios.post(url,lead,{headers: headers});
    }
    updateLead(lead){
        const url = `${API_URL}/leads/${lead.pk}`;
        const headers = {Authorization: `Bearer ${AuthService.getAuthToken()}`};
        return axios.put(url,lead,{headers: headers});
    }    
} 