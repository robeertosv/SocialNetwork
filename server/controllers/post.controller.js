import multer from 'multer';
import path from 'path';
import fs from 'fs';

import Post from '../models/post.model.js'

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

        const post = await new Post({
            ownerId: req.body.ownerId,
            isImage: req.file ? true : false,
            image: req.file ? 'http://localhost/images/'+req.file.filename : null,
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