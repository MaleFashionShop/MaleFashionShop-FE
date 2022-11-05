import axios from 'axios';

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaWV1Y2Fwdmlwcm8xMjMiLCJpYXQiOjE2Njc1MzE5NzMsImV4cCI6MTY2NzYxODM3M30.sTA3pk7C8ke-Mbw_vzGMLRKEa3DF4pTunNNr42kawneXkYCmgJycX3U52VmGkMnnwunh8L1QA_juTobcWDvYLQ'

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'content-type': 'application/json',
        // 'Access-Control-Allow-Origin': '*'
        'Authorization': 'Bearer ' + token
    }
})

export default axiosClient
