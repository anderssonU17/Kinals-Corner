'use strict'

const  {generateJWT} = require('../helpers/create-jwt');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const {name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(500).json({ message: "Un usuario ya esta registrado con este nombre", ok: false, user: user});
        user = new User(req.body);

        const saltos = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, saltos);

        user = await user.save();

        const token = await generateJWT(user.id, user.name, user.email, user.password);
        return res.status(200).json({ message: `El usuario ${user} ha sido creado correctamente`, user, token: token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Hubo un error en la creación del usuario", });
    }
}

const readUser = async (req, res) => {
    try {
        const idUser = req.user._id;
        const user = await User.findById(idUser);
        if (!user) return res.status(400)({ message: "No se encontró el usuario" });
        return res.status(200)({ message: "Usuario encontrado", user });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "No se ha podido listar correctamente" })
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = { ...req.body }

        user.password = user.password
            ? bcrypt.hashSync(user.password, bcrypt.genSaltSync())
            : user.password;
        const changes = await User.findByIdAndUpdate(id, user, { new: true });
        if (changes) {
            const token = await generateJWT(user.id, user.name, user.email);
            return res.status(200).json({ message: "El usuario se actualizo correctamente", user, token });
        } else {
            res.status(400).json({ message: "El usuario a editar no existe en la base de datos" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "No se ha podido editar correctamente" });
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        return res.status(200).json({ message: `${id} se elimino correctamente`, user });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "No se ha podido eliminar correctamente" });
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(500).json({message: "Para ingresar, primero debe registrarse"});

        bcrypt.compare(password, user.password, async (error, result) => {
            if(error) return res.status(500).send({message: "Se ha producido un error"});
            if(result) {
                const token = await generateJWT(user.id, user.email);
                res.status(200).json({ok: true, uid: user.id, email: user.email, token});
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "No se ha podido iniciar sesión correctamente"});
    }
}

const userDefault = async(req, res) =>{
    const user = await User.find();
    try{
        if(user.length == 0){
            user = new User();

            user.name = "usuarioPrueba";
            user.password = "123456789";
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
            user.email = "usuarioprueba@gmail.com";
            user.rol = "USER"

            user = await user.save();
            return console.log(`El usuario ${user} ha sido creado por defecto`);
        }
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser,
    loginUser,
    userDefault
}