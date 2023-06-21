'use strict'

const Teacher = require('../models/teacher.model')

//Modulo nativo de node.js que permite interactuar con archivos del sistema.
const fs = require('fs')
//Modulo nativo de node.js que permite trabajar con rutas de archivos y directorios
const path = require('path')

const createTeacher = async(req, res) => {

    try {
        
        let newTeacher = new Teacher(req.body);
        console.log(newTeacher);

        newTeacher = await newTeacher.save();

        if(!newTeacher) return res.status(500).send({message: 'No se ha podido crear el nuevo profesor.'});

        return res.status(200).send({message: 'Nuevo profesor creado correctamente.', newTeacher});

    } catch (error) {
    
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la tarea.', error})

    }

}

//Agregar foto a un profesor
const addImageTeacher = async(req, res) =>{
    try {
        
        //Obtener el id del profesor al que se le va agregar la imagen
        const teacherId = req.body.teacherId;
        
        //Comprobar si el profesor ya tiene una imagen asignada
        const alreadyImageTeacher = await Teacher.findOne({_id: teacherId})
        console.log('Usuario encontrado:');
        console.log(alreadyImageTeacher);
        let pathFile = './uploads/teachers/' // Ruta donde se guardan las imagenes de los profesores
        if(alreadyImageTeacher.photo) fs.unlinkSync(pathFile + alreadyImageTeacher.photo) // Va ir a eliminar la imagen ya existente del profesor

        //Comprobar que si este mandado un archivo y que este tenga una extencion
        if( !req.files || !req.files.image || !req.files.image.type ) return res.status(400).send({message: 'No ha enviado una imagen'}) //Comprobar que se haya enviado alguna imagen en la peticion 

        //***** Ruta para guardar la imagen
        const filePath = req.files.image.path; // \uploads\teachers\teacherName.png
        console.log('El filePath');
        console.log(filePath);
        const fileSpit = filePath.split('\\') // Va guardar un arreglo de String cada que encuente una jererquia
        console.log('El fileSpit');
        console.log(fileSpit);
        const fileName = fileSpit[fileSpit.length -1] //En la posicion 2 por que esa es la posicion en el arreglo donde se guarda el nombre de la imagen
        console.log('El fileName');
        console.log(fileName);

        //Validar la extension (el tipo de archivo) 
        const extension = fileName.split('\.'); // Volvemos a separar pero ahora cuando encuentre un '.'
        const fileExtension = extension[1];
        console.log('Extension de la imagen');
        console.log(fileExtension);

        if( 
            fileExtension == 'png' ||
            fileExtension == 'jpg' ||
            fileExtension == 'jpeg' ||
            fileExtension == 'gif'
         ){

            //Actualizar el profesor
            const teacherUpdate = await Teacher.findOneAndUpdate(
                {_id: teacherId}, 
                { photo: fileName }, 
                {new: true})

            if(!teacherUpdate) return res.status(404).send({message: 'No se encontro el profesor y se agrego la imagen.'});
            
            return res.status(200).send({message: 'Imagen agregada al profesor.', teacherUpdate})

        }
        fs.unlinkSync(filePath); //Se eliminar la imagen que se ha recibido
        return res.status(404).send({message: 'La extension del archivo no es admitida.'});

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Error al agregar imagen.', error});
    }
}

module.exports = {createTeacher, addImageTeacher}