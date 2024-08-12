import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import generateTokenAndCookie  from "../utils/cookies.js"
import checkSign from "../utils/checkCookie.js"

export const createAccount = async (req, res) => {
    try {
        const { username, name, password, cPassword, email } = req.body

        // Validate passwords

        if (password != cPassword) { return res.status(400).json({ error: 'Passwords must match' }) }
        if (password.length < 8) { return res.status(400).json({ error: 'Password must have at least 8 chars' }) }

        const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!regex.test(email)) {
            return res.status(400).json({ error: 'Email must be valid' })
        }

        let user = await User.findOne({ username })

        if (user) { return res.status(400).json({ error: 'That username is already taken' }) }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        user = await new User({ username, name, password: hashedPass, email })
        await user.save()

        return res.status(200).json({ error: 'OK' })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }


}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: "No se encontró al usuario", code: 404})

        

        const correctPass = await bcrypt.compare(password, user?.password || "");

        if (!correctPass) return res.status(403).send({ error: "La contraseña no es correcta", code:403})


        generateTokenAndCookie(user._id, res);
        return res.status(200).json({error: "Login correcto", code:200});


    } catch (error) {
        return res.status(500).json({ error: "Error al hacer el login: " + error.message, code: 500})
    }
}

export const deleteAccount = async (req, res) => {

}
export const checkLogin = async (req, res) => {
    const u = checkSign()

    return !u ? res.status(200).send('no') : res.status(200).send('yes')
}