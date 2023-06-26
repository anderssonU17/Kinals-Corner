import axios from "axios";
const URL = "http://localhost:3002/api/";

export const readForum = async () =>{   // se agrego api para poder mostrar los posts de base de datos
    try{ 
        const {data:{forum}} = await axios.get(`${URL}read-forum`)
        return forum
    }catch(e){
        throw new Error(e)
    }
}