import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-create-burgger.firebaseio.com/'
});

export default instance;