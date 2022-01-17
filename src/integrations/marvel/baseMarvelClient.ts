import axios from 'axios';

const baseMarvelClient = axios.create({
    baseURL: 'http://gateway.marvel.com',
    headers: {
        'Content-Type': 'application/json'
    },
    params: {
        'apikey': '',
    }
});

export default baseMarvelClient;