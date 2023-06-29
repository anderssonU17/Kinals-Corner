import axios from "axios";
const URL = "http://localhost:3002/api/";


export const readForum = async () => {  // funcion que conecta el back con front para mostrar publciaciones
    try {
        const response = await axios.get(`${URL}read-forum`);
        return response.data.posts;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

export const createForum = async (title, content) =>{
    try{
        const posts = {title, content}
        const response = await axios.post(`${URL}create-forum`, posts)
        return response.data
    }catch(e){
        throw new Error(e)
    }
}