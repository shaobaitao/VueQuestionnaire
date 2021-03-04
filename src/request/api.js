import axios from "axios";

export const getAnalysis=data=>{
    return axios.post('api/getAnalysis.php',data).then(res=>res.data);
};
