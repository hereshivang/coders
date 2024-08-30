import axios from "axios";

const useCreateRoom = async (roomInfo, token)=>{
    try{
        let res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/room/create`, roomInfo, {
            headers : {
                'Content-Type' : 'application/json',
                Authorization : token
            }
        } )
        return res.data;
    }catch(err){
        return {error : err.message};
    }
}

export default useCreateRoom;