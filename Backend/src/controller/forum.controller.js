'use strict'

const Forum = require('../models/forum.model');

const createForum = async(req, res) => {
    try{
        const {title, content} = req.body;

        const newPost = new Forum({
            title,
            content,
        });

        const savedPost = await newPost.save();
        return res.status(200).json({message: 'Nuevo post de foro agregado', post: savedPost})
    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Error al agregar el nuevo post de foro'})
    }
}

const getForum = async(req, res) => {
    try{
        const posts = await Forum.find().populate('comments.user');
        return res.status(200).json({message: 'Posts del foro obtenidos', posts});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Error al obtener los posts del foro'})
    }
}


const addCommentToPost = async (req, res) => {
    try{
        const {postId, comment} = req.body;

        //Obtener el usuario del token
        const user = req.user;

        const post = await Forum.findById(postId);
        if(!post) {
            return res.status(400).json({message: 'Post no encontrado'});
        }

        const newComment = {
            user: user, // Asignar el objeto de usuario completo al campo 'user', 
            comment,
        }

        post.comments.push(newComment);
        const updatedPost = await post.save();

        return res.status(200).json({message: 'Comentario agregado al post', post: updatedPost});

    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Error al agregar comentario al post'})
    }
}

const updateForumPostLikes = async(req, res) => {
    try{
        const {postId, likes} = req.body;

        //obtener el usuario del token 
        const user = req.user;

        const post = await Forum.findByIdAndUpdate(
            postId, 
            {
                $set: { likes },
                $addToSet: {likedBy: user._id}, //Agregar el id del usuario a la lista de usuarios 
            }, 
            { new: true }
        );

        if (!post) {
            return res.status(400).json({message: 'Likes del post actualizados', post});
        }

        return res.status(400).json({message: 'Likes del post actualizado', post});

    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Error al actualizar los likes del post'})
    }
}

module.exports = {createForum, getForum, addCommentToPost, updateForumPostLikes};