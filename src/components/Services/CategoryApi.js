import axios from "axios";

export const fetcher= async (url)=>{
    try{
        let response = await axios.get(url)
        return response
    }
    catch(error){
        console.log(error);
    }
}