import multer from 'multer';
import path from 'path';
import fs from 'fs';

import Post from '../models/post.model.js'
import User from '../models/user.model.js'
import checkSign from '../utils/checkCookie.js'
import { getUserProfileByID } from './user.controller.js';

// Crear el directorio 'uploads/' si no existe
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configuración de multer para manejar la subida de archivos con la extensión original
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Aquí defines el directorio de destino
    },
    filename: function (req, file, cb) {
        // Aquí cambias el nombre del archivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname); // Obtiene la extensión del archivo original
        const newFilename = file.fieldname + '-' + uniqueSuffix + ext;
        cb(null, newFilename); // Define el nuevo nombre
    }
});

export const upload = multer({ storage: storage });

export const create = async (req, res) => {
    // Loguear los datos recibidos
    try {
        if (req.body == {} && !req.file) {
            return res.status(400).json({ error: 'Not a valid post' })
        }

        const user = await checkSign(req)
        const ownerId = user._id

        const post = await new Post({
            ownerId,
            isImage: req.file ? true : false,
            image: req.file ? 'http://localhost/images/' + req.file.filename : null,
            textContent: req.body ? req.body.post : null,
            date: Date.now(),

        })

        await post.save()

        // Responder con un mensaje de éxito
        return res.status(200).json({ message: 'Datos recibidos correctamente' });
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

export const allPostUID = async (req, res) => {
    try {
        const { UID } = req.body

        const posts = await Post.find({ ownerId: UID })

        return res.status(200).json({ posts })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const getByID = async (req, res) => {
    try {
        const { id } = req.body
        const post = await Post.findOne({ _id: id })

        if (!post) { return res.status(404).json({ error: 'No existe el post', code: 404 }) }

        const owner = await User.findOne({ _id: post.ownerId })

        //username, profilePIC, isVerified, postText, postImage, likes, comments

        return res.status(200).json({ username: owner.username, pic: owner.pic, isVerified: owner.isVerified, postText: post.textContent, image: post.image, likes: post.likes, comments: post.comments })
    } catch (error) {
        return res.status(500).json({ error: error.message, code: 500 })
    }
}

export const comment = async (req, res) => {
    try {
        const { comment, post } = req.body

        const user = await checkSign(req)

        const p = await Post.findOne({ _id: post })
        if (!p) { return res.status(404).json({ error: "No existe ese post" }) }

        let postComments = p.comments

        postComments.push({ user, comment })

        await Post.findByIdAndUpdate(post, { comments: postComments })

        return res.status(200).json({ message: 'OK' })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

export const getComments = async (req, res) => {
    try {
        const { id } = req.body
        const post = await Post.findOne({ _id: id })

        if (!post) { return res.status(404).json({ error: 'No existe ese post' }) }

        const comments = post.comments

        return res.status(200).json(comments)

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

export const deletePost = async (req, res) => {
    try {
        const { postID } = req.body
        const user = await checkSign(req)
        const ownerId = user._id

        const post = await Post.findOne({ _id: postID })

        if (!post) { return res.status(404).json({ error: 'El post no existe' }) }

        if (ownerId != post.ownerId) { return res.status(403).json({ error: 'Este usuario no puede eliminar el post' }) } // Y si es un admin banneando?

        await Post.deleteOne({ _id: post._id, ownerId })

        return res.status(200).json({ message: 'Post eliminado' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const like = async (req, res) => {
    try {
        const { id, liked } = req.body

        const uid = await checkSign(req)

        const post = await Post.findOne({ _id: id })

        if (!post) { return res.status(404).json({ error: 'No existe ese post' }) }
        const likes = post.likes

        if (liked) {
            const fl = likes.filter(f => f.toString() !== uid._id.toString());

            await Post.findByIdAndUpdate(id, { likes: fl })
        } else {
            let f = likes
            f.push(uid._id)
            await Post.findByIdAndUpdate(id, { likes: f })

        }

        return res.status(200).json({ message: liked ? 'unliked' : 'liked' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const feed = async (req, res) => {
    try {
        let userId = await checkSign(req); // Suponiendo que tienes autenticación y puedes obtener el ID del usuario
        userId = userId._id

        const user = await User.findOne(userId).populate('following');

        if (!user) { return res.status(404).json({ error: 'Usuario no encontrado' }) }

        const followingIds = user.following

        const { page = 1, limit = 10 } = req.query; // Recibe la página y el límite desde el frontend

        let posts = await Post.find({
            $or: [
                { ownerId: { $in: followingIds } },
                { ownerId: { $nin: followingIds }, isPublic: true }
            ]
        })
            .sort({ date: -1 }) // Ordenar por fecha descendente
            .skip((page - 1) * limit) // Saltar posts ya cargados
            .limit(parseInt(limit)); // Limitar la cantidad de posts obtenidos

        
            let p = await Promise.all(posts.map(async (post) => {
                let e = await getUserProfileByID(post.ownerId);
                
                let u = { username: e.username, pic: e.pic, isVerified: e.verified };
                console.log(u)
                return { post, u };
            }));


        return res.status(200).json({ posts: p, user: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el feed' });
    }
}