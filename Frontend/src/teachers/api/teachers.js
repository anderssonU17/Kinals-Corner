'use strict'

import axios from "axios";
import Swal from "sweetalert2";
import { Teacher } from "../components/teacher";

const URL = 'http://localhost:3002/api/'

//Obtener el listado de todos los profesores
export const getTeachers = async() => {
    try {
        
        const response = await axios.get(`${URL}getAllTeachers`)
        // console.log(response.data.teachers);
        return response.data.teachers

    } catch (error) {
        console.error(error);
    }
}

//Agregar el profesor
export const createTeacher = async(name, subject, email, image) => {
    try {
        
        const data = {
            name: name,
            subject: subject,
            email: email
        }

        const response = await axios.post(`http://localhost:3002/api/addTeacher`, data )
        const newTeacher = response.data.newTeacher;

        addImageTeacher(newTeacher._id, image)

    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
            showConfirmButton: true,
            confirmButtonText: "OK"
            })
    }
}

//Agregar imagen al profesor
export const addImageTeacher = async(teacherId,image) =>{
    try {

        const data = {
            teacherId: teacherId,
            image: image
        }
        
        const response = await axios.put(`${URL}addImageTeacher`, data, 
        { headers: { 'Content-Type': 'multipart/form-data' } })

        if(response){
            Swal.fire({
                icon: 'success',
                title: 'Se agrego el nuevo profesor correctamente.',
                showConfirmButton: true,
                confirmButtonColor: '#32FF00'
            }).then(
                (r) => {
                    if(r.isConfirmed){
                        window.location.reload()
                    }else{
                        window.location.reload()
                    }
                }
            )
        }
        // return response;

    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.msg,
            showConfirmButton: true,
            confirmButtonText: "OK"
            })
    }
}

//Eliminar profesor
export const deleteTeacher = async(teacherId) => {
    try {

        const response = await axios.delete(`${URL}deleteTeacher`, {
            data: {
                teacherId: teacherId
            }
        })

        return response

    } catch (error) {
        console.error(error);
    }
}

//Ventan de sweetAlert para confirmar que se quiere eliminar el profesor
export const confirmDeleteTeacher = (teacherId, setTeachers, teachers) => {
    Swal.fire({
        icon: 'question',
        text: '¿Estas seguro de eliminar este profesor?',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: 'tomato',
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#32FF00'
    }).then(
        (r) => {
            if(r.isConfirmed){
                deleteTeacher(teacherId).then(
                    () => {
                        setTeachers( teachers.filter( teacher => teacher._id !== teacherId  ) )
                    }
                )
            }
        }
    )
}
