import axios from 'axios';

const API = axios.create({
    baseURL: '/fake-api',
});

export const fetchShareholdersData = async () => {
    await API.get('/shareholders');
    const response = await axios.get('./data.json');
    return response.data;
};
