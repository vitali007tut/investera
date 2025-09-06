import axios from 'axios';

export const fetchShareholdersData = async () => {
    const response = await axios.get('./data.json');
    return response.data;
};
