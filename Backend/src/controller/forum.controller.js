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

const addLikeToForumPost = async (req, res) => {
    try {
      const { postId } = req.body;
  
      // Obtener el usuario del token
      const user = req.user;
  
      // Buscar el post por su ID y comprobar si existe
      const post = await Forum.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post no encontrado' });
      }
  
      // Verificar si el usuario ya ha dado like al post
      if (post.likedBy.includes(user._id)) {
        // Si ya ha dado like, eliminar el like
        post.likes--;
        post.likedBy.pull(user._id);
      } else {
        // Si no ha dado like, agregar el like
        post.likes++;
        post.likedBy.push(user._id);
      }
  
      // Guardar los cambios en el post
      const updatedPost = await post.save();
  
      return res.status(200).json({ message: 'Like agregado al post', post: updatedPost });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error al agregar el like al post' });
    }
  };
  

module.exports = {createForum, getForum, addCommentToPost, addLikeToForumPost};