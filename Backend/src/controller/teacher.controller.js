'use strict'

const Teacher = require('../models/teacher.model')

//Modulo nativo de node.js que permite interactuar con archivos del sistema.
const fs = require('fs')
//Modulo nativo de node.js que permite trabajar con rutas de archivos y directorios
const path = require('path')

//Crear profesor
const createTeacher = async(req, res) => {

    try {
        
        let newTeacher = new Teacher(req.body);
        
        const mailExists = await Teacher.findOne({mail: newTeacher.mail})
        if(mailExists) return res.status(400).send({message: 'El correo que tratas de registrar para el nuevo profesors ya esta en uso.'})

        newTeacher = await newTeacher.save();

        if(!newTeacher) return res.status(500).send({message: 'No se ha podido crear el nuevo profesor.'});

        return res.status(200).send({message: 'Nuevo profesor creado correctamente.', newTeacher});

    } catch (error) {
    
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la tarea.', error})

    }

}

const readTeachers = async(req, res) =>{
    try {
        
        const teachers = await Teacher.find();
        if(teachers.length == 0) return res.status(404).send({message: 'No se han agregado profesores'});

        return res.status(200).send({message: 'Profesores encontrados', teachers});

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la tarea.', error})
    }
}

//Actualizar un profesor
const updateTeacher = async(req, res) =>{
    try {
        
        let newTeacher = req.body

        const mailExists = await Teacher.findOne({mail: newTeacher.mail})
        if( mailExists && mailExists._id !== newTeacher.teacherId) return res.status(400).send({message: 'El correo que tratas de registrar para el nuevo profesors ya esta en uso.'})

        if(newTeacher.photo) delete newTeacher.photo;

        newTeacher = await Teacher.findOneAndUpdate({_id: req.body.teacherId}, {newTeacher}, {new: true});

        if(!newTeacher) return res.status(404).send({message: 'No se encontro el profesor y no se actualizo'});

        return res.status(200).send({message: 'El profesor fue actualizado correctamente.', newTeacher});

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la tarea.', error})
    }
}

const deleteTeacher = async(req, res)=>{
    try {
        
        const teacherId = req.body.teacherId;

        let teacherDelete = await Teacher.findOneAndDelete({_id: teacherId});

        if(!teacherDelete) return res.status(404).send({message: 'No se encontro el profesor a eliminar.' });

        if(teacherDelete.photo){
            let pathFile = './uploads/teachers/';
            fs.unlinkSync(pathFile + teacherDelete.photo);
        }

        return res.status(200).send({message: 'Profesor eliminado correctamente. Datos del profesor eliminado:', teacherDelete});

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la tarea.', error});
    }
}

// =============================== Manejo de imagenes ===================================

//Agregar foto a un profesor
const addImageTeacher = async(req, res) =>{
    try {
        
        //Obtener el id del profesor al que se le va agregar la imagen
        const teacherId = req.body.teacherId;
        
        if(!teacherId) return res.status(400).send({message: 'El parametro `teacherId` es obligatorio.' })

        //Comprobar si el profesor ya tiene una imagen asignada
        const alreadyImageTeacher = await Teacher.findOne({_id: teacherId})
        console.log('Usuario encontrado:');
        console.log(alreadyImageTeacher);
        let pathFile = './uploads/teachers/'; // Ruta donde se guardan las imagenes de los profesores

        //Comprobar que si este mandado un archivo y que este tenga una extencion
        if( !req.files || !req.files.image || !req.files.image.type ) return res.status(400).send({message: 'No ha enviado una imagen'}) //Comprobar que se haya enviado alguna imagen en la peticion 

        //***** Ruta para guardar la imagen
        const filePath = req.files.image.path; // \uploads\teachers\teacherName.png
        const fileSpit = filePath.split('\\') // Va guardar un arreglo de String cada que encuente una jererquia
        const fileName = fileSpit[fileSpit.length -1] //En la posicion 2 por que esa es la posicion en el arreglo donde se guarda el nombre de la imagen

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

            if(alreadyImageTeacher.photo) fs.unlinkSync(pathFile + alreadyImageTeacher.photo) // Va ir a eliminar la imagen ya existente del profesor

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

//Obtener la foto de un profesor
const getImageTeacher = async(req, res)=>{
    try {
        const teacherId = req.body.teacherId;
        if(!teacherId || teacherId == '') return res.status(400).send({message: 'El parametro `teacherId` es obligatorio.' })
        const teacherFInd = await Teacher.findOne({_id: teacherId});

        const fileName = teacherFInd.photo;
        const pathFile = './uploads/teachers/' + fileName

        const image = fs.existsSync(pathFile);
        if(!image) return res.status(404).send({message: 'No se encontro la imagen.'});

        return res.status(200).sendFile(path.resolve(pathFile))

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la tarea.', error})
    }
}

module.exports = {createTeacher, addImageTeacher, getImageTeacher, readTeachers, updateTeacher,deleteTeacher}