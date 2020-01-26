import axios from 'axios';

export const Login = (data) => (
    axios.post('http://localhost:4000/api/Login', data)
            .then(res => {
                return res;
            })
)
