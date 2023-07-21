import axios from "axios"; {/*se agrego api para poder crear usuario */}
const URL = "http://localhost:3002/api/"

export const createUser = async (name, email, password)=>{
try{
    const users = {
        name, email,password
    }
    const response = await axios.post(`${URL}create-user`, users)
    return response.data
}catch(e){
    throw new Error(e)
}
}