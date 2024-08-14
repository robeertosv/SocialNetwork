import User from '../models/user.model.js'
import checkSign from '../utils/checkCookie.js'
import bcrypt from 'bcrypt'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

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

export const checkUsername = async (req, res) => {
    const { username } = req.body

    const user = await User.findOne({ username })

    if (user) {
        return res.status(200).json({ exist: true })
    } else {
        return res.status(200).json({ exist: false })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.findOne({ username })

        if (!user) { return res.status(404).json({ error: 'nouser', errorMessage: "El usuario no existe" }) }

        const result = {
            id: user._id.toString(),
            name: user.name,
            bio: user.bio,
            pic: user.pic,
            verified: user.isVerfied,
            private: user.isPrivate,
            seguidores: user.followers,
            seguidos: user.following,
            banned: user.isBanned
        }

        return res.status(200).json(JSON.stringify(result))
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const getUID = async (req, res) => {
    const { username } = req.body
    try {
        const user = await User.findOne({ username })
        return res.status(200).json({ UID: user._id })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

export const getUsernameByToken = async (req, res) => {
    const data = await checkSign(req)

    return res.status(200).json(data)
}

export const requestFollow = async (req, res) => {
    try {
        const { id, username } = req.body;

        const follower = await User.findOne({ _id: id });
        const followed = await User.findOne({ username });

        if (!follower || !followed) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        if (followed.isPrivate) {
            const fid = followed._id.toString()
            let notifications = followed.notifications
            notifications.push({pic: follower.pic, text: `@${follower.username} ha solicitado seguirte`, type: 'request', origin:follower.username})
            await User.findByIdAndUpdate(fid, {notifications})
            return res.status(200).json({ error: "Solicitud de seguimiento envíada" });
        } else {
            // Inicializar arrays si están indefinidos
            let followerFollowings = follower.following || [];
            let followedFollowers = followed.followers || [];

            // Agregar los IDs como cadenas de texto
            followerFollowings.push(followed._id.toString());
            followedFollowers.push(follower._id.toString());

            // Actualizar los usuarios
            await User.findByIdAndUpdate(follower._id, { following: followerFollowings });
            await User.findByIdAndUpdate(followed._id, { followers: followedFollowers });

            return res.status(200).json({ message: 'Os habeis empezado a seguir', followedFollowers, followerFollowings });
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const acceptFollow = async (req, res) => {
    try {
        const { id, username } = req.body;

        const follower = await User.findOne({ username });
        const followed = await User.findOne({ _id: id });

        if (!follower || !followed) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }


        // Inicializar arrays si están indefinidos
        let followerFollowings = follower.following || [];
        let followedFollowers = followed.followers || [];

        // Agregar los IDs como cadenas de texto
        followerFollowings.push(followed._id.toString());
        followedFollowers.push(follower._id.toString());

        // Actualizar los usuarios
        await User.findByIdAndUpdate(follower._id, { following: followerFollowings });
        await User.findByIdAndUpdate(followed._id, { followers: followedFollowers });

        return res.status(200).json({ message: 'Os habeis empezado a seguir', followedFollowers, followerFollowings });


    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export const cancelFollow = async (req, res) => {
    try {
        const { id, username } = req.body;

        const follower = await User.findOne({ _id: id });
        const followed = await User.findOne({ username });

        if (!follower || !followed) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Asegurarse de que follower.following y followed.followers sean arrays
        const followerFollowings = follower.following || [];
        const followedFollowers = followed.followers || [];

        // Filtrar los arrays de seguidores y seguidos
        const updatedFollowerFollowings = followerFollowings.filter(f => f.toString() !== followed._id.toString());
        const updatedFollowedFollowers = followedFollowers.filter(f => f.toString() !== follower._id.toString());

        // Actualizar los usuarios con los arrays filtrados (asegurando que no sean null)
        await User.findByIdAndUpdate(follower._id, { following: updatedFollowerFollowings });
        await User.findByIdAndUpdate(followed._id, { followers: updatedFollowedFollowers });

        return res.status(200).json({ message: `${follower.username} ha dejado de seguir a ${followed.username}` });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getFollowers = async (req, res) => {
    try {
        const ID = req.body.username;

        const user = await User.findOne({ username: ID })

        if (!user) { return res.status(404).json({ error: "No existe el usuario" }) }

        const userFollowers = user.followers;


        let f = []

        for (const fo of userFollowers) {
            const follower = await User.findOne({ _id: fo });
            f.push({
                pic: follower.pic === '' ? 'no-profile.jpg' : follower.pic,
                username: follower.username
            });
        }

        return res.status(200).json({ followers: f })
    } catch (error) {

        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getFollows = async (req, res) => {
    try {
        const ID = req.body.username;

        const user = await User.findOne({ username: ID })

        if (!user) { return res.status(404).json({ error: "No existe el usuario" }) }

        const userFollowers = user.following;


        let f = []

        for (const fo of userFollowers) {
            const follower = await User.findOne({ _id: fo });
            f.push({
                pic: follower.pic === '' ? 'no-profile.jpg' : follower.pic,
                username: follower.username
            });
        }

        return res.status(200).json({ follows: f })
    } catch (error) {

        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { id, username, name, email, password, cPassword, bio, isPrivate } = req.body
        const file = req.file

        const user = await User.findOne({ _id: id })

        if (!user) { return res.status(404).json({ error: "User not found" }) }


        await User.findByIdAndUpdate(id, { username, name, email, bio, isPrivate })

        if (password != '') {
            if (password != cPassword) { return res.status(400).json({ error: 'Las contraseñas deben ser las mismas' }) }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            await User.findByIdAndUpdate(id, { password: hashedPassword })
        }

        if (req.file) {
            let ipath = "http://localhost/images/" + req.file.filename
            await User.findByIdAndUpdate(id, { pic: ipath })
        }

        return res.status(200).json({ message: 'modificado' })

    } catch (error) {
        return res.status(500).json({ error: error.message, message: "Ese nombre de usuario ya existe, prueba otro" })
    }
}

export const getNotifications = async (req, res) => {
    let user = req.cookies.sessionToken
    user = await checkSign(req, res)
    return res.status(200).json({ username: user.username, notifications: user.notifications })
}