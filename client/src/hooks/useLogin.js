import axios from "axios";

let useLogin = async (inputs)=>{
    try{
        let res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/login`, inputs, {
            headers : {
                'Content-Type' : 'application/json'
            }
        })

        return res.data;

    }catch(err){
        console.log(err);
        return {error : err.message};
    }
}

export default useLogin;