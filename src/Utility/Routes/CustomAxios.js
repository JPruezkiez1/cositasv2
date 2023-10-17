import axios from 'axios';

const customAxios = axios.create();

customAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.data && error.response.data.error) {
            console.error('Error:', error.response.data.error);
        }
        return new Promise(() => { });
    }
);

export default customAxios;
